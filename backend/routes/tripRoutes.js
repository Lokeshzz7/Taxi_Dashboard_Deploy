    const express = require("express");
    const bodyParser = require('body-parser');
    const router = express.Router();
    const Trip = require("../models/tripModel.js");
    const Driver = require('../models/driverModel.js');
    const Car = require("../models/carModel.js")
    const Invoice =  require("../models/invoiceModel.js");
    const Income = require("../models/incomeModel.js");
    const { authMiddleware, adminMiddleware, driverMiddleware } = require("../authMiddleware.js");
    const {generateInvoicePDF} = require('../services/invoiceService.js');
    const {sendInvoiceByEmail} = require('../services/gmailService.js');
    // const {sendInvoiceViaWhatsApp} = require('../services/whatsappService.js');
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //Admin's Part

    router.get("/admin", authMiddleware, adminMiddleware, async (req, res) => {
        try {
            const trips = await Trip.find().populate('car driver');
            res.status(200).json(trips);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    router.post("/admin/add", authMiddleware, adminMiddleware, async (req, res) => { 
        const { car, driver, startKm, fare, fareType, advance, customerName, customerPhoneNo, customerAadhaarNo, customerAddress,customerEmail,remarks } = req.body; 
    
        try {
            // Validate driver availability
            const driverData = await Driver.findById(driver);
            if (!driverData || driverData.status !== 'available') {
                return res.status(400).json({ message: "Driver is either unavailable or inactive." });
            }
            if (driverData.status === 'in-trip') {
                return res.status(400).json({ message: "Driver is currently assigned to another trip." });
            }
    
            // Validate car availability
            const carData = await Car.findById(car);
            if (!carData || carData.status !== 'available') {
                return res.status(400).json({ message: "Car is currently in use or unavailable." });
            }
    
            // Create a new trip instance
            const newTrip = new Trip({
                car,
                driver,
                startKm,
                endKm:  null,  // Use provided endKm or null
                startDate: new Date(),  // Use current date for startDate
                endDate: null,           // Initially, endDate is null
                fare,
                fareType,                // Include fareType from request body
                status: 'pending',
                advance: advance || 0,
                customerName,
                customerPhoneNo,
                customerAadhaarNo,
                customerAddress,
                customerEmail,
                remarks,
            });
    
            // Save the new trip
            await newTrip.save();        
    
            // Update driver data
            driverData.trips.push(newTrip._id);
            driverData.status = 'in-trip'; 
            driverData.currentCar = carData._id;
            driverData.numberOfTrips = (driverData.numberOfTrips || 0) + 1; // Increment numberOfTrips
            await driverData.save();
    
            // Update car data
            carData.trips.push(newTrip._id);
            carData.status = 'in-trip'; 
            carData.currentDriver = driverData._id;
            carData.numberOfTrips = (carData.numberOfTrips || 0) + 1; // Increment numberOfTrips
            await carData.save();
    
            // Respond with the created trip
            res.status(201).json(newTrip);
        } catch (error) {
            console.error("Error creating trip:", error);
            res.status(500).json({ message: error.message });
        }
    });
    

    router.get("/admin/:id",authMiddleware,adminMiddleware, async (req, res) => {
        const { id } = req.params;
        try {
            const trip = await Trip.findById(id).populate('car driver');

            if (!trip) {
                return res.status(404).json({ message: "Trip not found" });
            }

            if (req.user.role === 'driver' && trip.driver.toString() !== req.user.userId.toString()) {
                return res.status(403).json({ message: "Access denied" });
            }

            res.status(200).json(trip);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });


   // PUT request to update trip information, ensuring admin and auth middleware validation
    router.put("/admin/:id", authMiddleware, adminMiddleware, async (req, res) => {
        const { id } = req.params; // Extract trip id from params
        const updates = req.body; // Extract updates from request body

        try {
            // Find the current trip and populate related car and driver information
            const trip = await Trip.findById(id).populate('car driver');
            
            // If trip is not found, return 404 error
            if (!trip) {
                return res.status(404).json({ message: "Trip not found" });
            }

            // Flags to track if car or driver is changed
            let isCarChanged = false;
            let isDriverChanged = false;

            // Case: Both car and driver are being updated
            if ((updates.car && updates.car.toString() !== trip.car.toString()) &&
                (updates.driver && updates.driver.toString() !== trip.driver.toString())) {
                
                isCarChanged = true;
                isDriverChanged = true;

                // Fetch new and current car/driver data
                const newCar = await Car.findById(updates.car);
                const newDriver = await Driver.findById(updates.driver);
                const currCar = await Car.findById(trip.car);
                const currDriver = await Driver.findById(trip.driver);

                // Error handling: Check if new car and driver exist
                if (!newCar) {
                    return res.status(404).json({ message: "Selected Car not found" });
                }
                if (!newDriver) {
                    return res.status(404).json({ message: "Selected Driver not found" });
                }

                // Update current car: Remove trip, set car status and driver to null
                currCar.trips.pop();
                currCar.numberOfTrips = currCar.trips.length;
                currCar.currentDriver = null;
                currCar.status = "available";
                await currCar.save();

                // Update new car: Add trip, assign driver, set status to "in-trip"
                newCar.currentDriver = newDriver;
                newCar.trips.push(trip.id);
                newCar.numberOfTrips = newCar.trips.length;
                newCar.status = "in-trip";
                newCar.currentDriver = newDriver;
                await newCar.save();

                // Update current driver: Remove trip, set status and car to null
                currDriver.trips.pop();
                currDriver.numberOfTrips = currDriver.trips.length;
                currDriver.currentCar = null;
                currDriver.status = "available";
                await currDriver.save();

                // Update new driver: Add trip, assign car, set status to "in-trip"
                newDriver.trips.push(trip.id);
                newDriver.numberOfTrips = newDriver.trips.length;
                newDriver.currentCar = newCar; // Assign the new car
                newDriver.status = "in-trip";
                newDriver.currentCar = newCar;
                await newDriver.save();


            // Case: Only car is being updated
            } else if (updates.car && updates.car.toString() !== trip.car.toString()) {
                isCarChanged = true;

                // Fetch new and current car data
                const newCar = await Car.findById(updates.car);
                const currCar = await Car.findById(trip.car);
                const currDriver = await Driver.findById(trip.driver);

                // Error handling: Check if new car exists
                if (!newCar) {
                    return res.status(400).json({ message: "New car not found" });
                }

                // Update current car: Remove trip, set car status and driver to null
                currCar.trips.pop();
                currCar.numberOfTrips = currCar.trips.length;
                currCar.currentDriver = null;
                currCar.status = "available";
                await currCar.save();

                // Update new car: Add trip, assign driver, set status to "in-trip"
                newCar.currentDriver = trip.driver;
                newCar.trips.push(trip.id);
                newCar.numberOfTrips = newCar.trips.length;
                newCar.status = "in-trip";
                await newCar.save();

                currDriver.currentCar = newCar;
                await currDriver.save();
            // Case: Only driver is being updated
            } else if (updates.driver && updates.driver.toString() !== trip.driver.toString()) {
                isDriverChanged = true;

                // Fetch new and current driver data
                const newDriver = await Driver.findById(updates.driver);
                const currDriver = await Driver.findById(trip.driver);
                const currCar = await Car.findById(trip.car);
                // Error handling: Check if new driver exists
                if (!newDriver) {
                    return res.status(400).json({ message: "New driver not found" });
                }

                // Update current driver: Remove trip, set status and car to null
                currDriver.trips.pop();
                currDriver.numberOfTrips = currDriver.trips.length;
                currDriver.currentCar = null;
                currDriver.status = "available";
                await currDriver.save();

                // Update new driver: Add trip, assign car, set status to "in-trip"
                newDriver.trips.push(trip.id);
                newDriver.numberOfTrips = newDriver.trips.length;
                newDriver.currentCar = trip.car;
                newDriver.status = "in-trip";
                await newDriver.save();

                currCar.currentDriver = newDriver;
                await currCar.save();
            }

            // Perform the update on the trip document
            const updatedTrip = await Trip.findByIdAndUpdate(id, updates, { new: true });

            // Error handling: Check if update succeeded
            if (!updatedTrip) {
                return res.status(404).json({ message: "Trip update failed or trip not found" });
            }

            // Log changes if car or driver was updated
            if (isCarChanged && isDriverChanged) {
                console.log("Both car and driver updated");
            } else if (isCarChanged) {
                console.log(`Car updated for trip ${id}`);
            } else if (isDriverChanged) {
                console.log(`Driver updated for trip ${id}`);
            }

            // Send success response with the updated trip
            res.status(200).json(updatedTrip);

        } catch (error) {
            // Handle any unexpected errors
            res.status(500).json({ message: error.message });
        }
    });


    router.delete("/admin/:id", authMiddleware, adminMiddleware, async (req, res) => {
        const { id } = req.params;

        try {
            const trip = await Trip.findById(id);

            if (!trip) {
                return res.status(404).json({ message: "Trip not found" });
            }
            const driverData = await Driver.findById(trip.driver);
            if (driverData) {
                driverData.trips.pull(trip._id); 
                driverData.numberOfTrips = driverData.trips.length;
                driverData.status = 'available'; 
                driverData.currentCar = null;
                await driverData.save();
            }

            // Remove trip reference from the car
            const carData = await Car.findById(trip.car);
            if (carData) {
                carData.trips.pull(trip._id); 
                carData.numberOfTrips = carData.trips.length;
                carData.status = 'available'; 
                carData.currentDriver = null;
                await carData.save();
            }
            

            // Delete the trip
            await Trip.findByIdAndDelete(id);

            res.status(200).json({ message: "Trip deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    // Ending a Trip By Admin
    router.post("/admin/:id/end", authMiddleware, adminMiddleware, async (req, res) => {
        const { id } = req.params;
        const { endKm, endDate, balance , discount , tripExpense } = req.body;
        console.log(id)
    
        if (!endKm || !endDate || balance === undefined) {
            return res.status(400).json({ message: "Please provide endKm, endDate, and balance." });
        }
    
        try {
            const trip = await Trip.findById(id);
            if (!trip) {
                return res.status(404).json({ message: "Trip not found" });
            }
    
            
            // Check if the trip is still pending
            if (trip.status !== 'pending') {
                return res.status(400).json({ message: "Trip is already completed or cancelled" });
            }
    
            // Validate endKm to make sure it's greater than startKm
            if (endKm <= trip.startKm) {
                return res.status(400).json({ message: "EndKm must be greater than startKm." });
            }
    
            // Log the balance and trip advance to check their values
            console.log('Balance:', balance);
            console.log('Trip Advance:', trip.advance);
    
            // Ensure balance and advance are valid numbers
            const validBalance = parseFloat(balance);
            const validAdvance = parseFloat(trip.advance);
            const disc = parseInt(discount);
            const tripexp = parseFloat(tripExpense);
           
            
            if(isNaN(validBalance)) {
                return res.status(400).json({ message: "Invalid balance amount." });
            }
            if (isNaN(validAdvance)) {
                return res.status(400).json({ message: "Invalid advance amount." });
            }
    
            // Calculate tripIncome
            const tripIncome = validBalance + validAdvance;
            console.log('Calculated Trip Income:', tripIncome);
    
            if (isNaN(tripIncome)) {
                return res.status(400).json({ message: "Invalid trip income." });
            }
    
            // Verify tripIncome is correctly assigned and passed to the Income model
            const income = new Income({
                trip: trip._id,
                car: trip.car,
                driver : trip.driver,
                tripIncome: tripIncome, // Correctly pass calculated trip income here
            });
            
            console.log('Income Object:', income);
    
            await income.save(); // Save income to database
    
            // Create Invoice
            const invoice = new Invoice({
                trip: trip._id,
                car: trip.car,
                driver: trip.driver,
                totalKm: endKm - trip.startKm,
                totalAmount: tripIncome, // Use calculated total amount here
                remarks: trip.remarks
            });
    
            await invoice.save(); // Save invoice to database
    
            // Update trip details
            if(disc && disc > 0){
                trip.discount = disc;
            }
            if(tripexp && tripexp > 0){
                trip.tripExpense = tripexp;
            }
            trip.endKm = endKm;
            trip.endDate = endDate;
            trip.status = 'completed';
            trip.balance = validBalance;
            trip.income = income._id; // Set the reference to income
            trip.invoice = invoice._id; // Set the reference to invoice
    
            await trip.save();
    
            // Update driver details regardless of who completed the trip
            const driverData = await Driver.findById(trip.driver);
            if (driverData) {
                driverData.currentCar = null;  // Set the current car to null
                driverData.status = 'available'; // Update status to available
                await driverData.save();
            } else {
                console.error("Driver not found for trip:", trip.driver);
            }
    
            // Update car details
            const carData = await Car.findById(trip.car);
            if (carData) {
                carData.currentDriver = null;  // Set current driver to null
                carData.status = "available";  // Update car status to available
                carData.income += tripIncome;
                await carData.save();
            } else {
                console.error("Car not found for trip:", trip.car);
            }


            try {
                // After saving the invoice to the database
                const invo =  {"car":carData.make,"driver" : driverData.name,"customerName" : trip.customerName,"customerEmail" : trip.customerEmail,
                    "tripId": trip._id,"tripDate": trip.startDate,"tripEndDate": trip.endDate,
                    "tripAdvance": validAdvance,"tripBalance": validBalance,
                    "tripIncome": tripIncome,"tripKm": endKm - trip.startKm,
                    "paymentDate" : Date.now(),"remarks" : trip.remarks, "discount" : trip.discount , "tripExpense": trip.tripExpense
                }
                const filePath = await generateInvoicePDF(invo);
                await sendInvoiceByEmail(trip.customerEmail,filePath);
                // After generating the invoice, send it via WhatsApp
                // await sendInvoiceViaWhatsApp(trip.customerPhoneNo, filePath);

        
                // You can use this filePath later to send via Gmail or WhatsApp
        
                res.status(200).json(trip);
            } catch (error) {
                console.error('Error ending trip and generating invoice:', error);
                res.status(500).json({ message: error.message });
            }
    
    
        } catch (error) {
            console.error("Error ending trip:", error);
            res.status(500).json({ message: error.message });
        }
    });
    
    
    //Driver's part

    router.get("/driver", authMiddleware,driverMiddleware, async (req, res) => {
        console.log("User Role:", req.user.role); // Log the role here
        try {
            const driver = await Driver.findOne({ user: req.user.userId });
            if (!driver) {
                return res.status(404).json({ message: "Driver not found" });
            }
            const trips = await Trip.find({ driver: driver._id }).populate('car driver');
            res.status(200).json(trips);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });


    router.post("/driver/:id/end", authMiddleware, driverMiddleware, async (req, res) => {
        const { id } = req.params;
        const { endKm, endDate, balance ,discount, tripExpense } = req.body;

        try {
            const trip = await Trip.findById(id).populate('driver');

            if (!trip) {
                return res.status(404).json({ message: "Trip not found" });
            }

            // Check if the requesting driver is the driver of the trip
            if (trip.driver.user.toString() !== req.user.userId.toString()) {
                return res.status(403).json({ message: "Access denied" });
            }

            // Check if the trip is still pending
            if (trip.status !== 'pending') {
                return res.status(400).json({ message: "Trip is already completed or cancelled" });
            }

            // Validate endKm to make sure it's greater than startKm
            if (endKm <= trip.startKm) {
                return res.status(400).json({ message: "EndKm must be greater than startKm." });
            }
    
            // Log the balance and trip advance to check their values
            console.log('Balance:', balance);
            console.log('Trip Advance:', trip.advance);
    
            // Ensure balance and advance are valid numbers
            const validBalance = parseFloat(balance);
            const validAdvance = parseFloat(trip.advance);
            const disc =  parseInt(discount);
            const tripexp = parseFloat(tripExpense);
            
            if (isNaN(validBalance)) {
                return res.status(400).json({ message: "Invalid balance amount." });
            }
            if (isNaN(validAdvance)) {
                return res.status(400).json({ message: "Invalid advance amount." });
            }
    
            // Calculate tripIncome
            const tripIncome = validBalance + validAdvance;
            console.log('Calculated Trip Income:', tripIncome);
    
            if (isNaN(tripIncome)) {
                return res.status(400).json({ message: "Invalid trip income." });
            }
    
            // Verify tripIncome is correctly assigned and passed to the Income model
            const income = new Income({
                trip: trip._id,
                car: trip.car,
                driver : trip.driver,
                tripIncome: tripIncome, // Correctly pass calculated trip income here
            });
            

    
            await income.save(); // Save income to database
    
            // Create Invoice
            const invoice = new Invoice({
                trip: trip._id,
                car: trip.car,
                driver: trip.driver,
                totalKm: endKm - trip.startKm,
                totalAmount: tripIncome, // Use calculated total amount here
                remarks: trip.remarks
            });
    
            await invoice.save(); // Save invoice to database
    
            // Update trip details
            if(disc && disc > 0){
                trip.discount = disc;
            }
            if(tripexp && tripexp > 0){
                trip.tripExpense = tripexp;
            }
            trip.endKm = endKm;
            trip.endDate = endDate;
            trip.status = 'completed';
            trip.balance = validBalance;
            trip.income = income._id; // Set the reference to income
            trip.invoice = invoice._id; // Set the reference to invoice
    
            await trip.save();
    
            // Update driver details regardless of who completed the trip
            const driverData = await Driver.findById(trip.driver);
            if (driverData) {
                driverData.currentCar = null;  // Set the current car to null
                driverData.status = 'available'; // Update status to available
                await driverData.save();
            } else {
                console.error("Driver not found for trip:", trip.driver);
            }
    
            // Update car details
            const carData = await Car.findById(trip.car);
            if (carData) {
                carData.currentDriver = null;  // Set current driver to null
                carData.status = "available";  // Update car status to available
                carData.income += tripIncome;
                await carData.save();
            } else {
                console.error("Car not found for trip:", trip.car);
            }
            try {
                // After saving the invoice to the database
                const invo =  {"car":carData.make,"driver" : driverData.name,"customerName" : trip.customerName,
                    "tripId": trip._id,"tripDate": trip.startDate,"tripEndDate": trip.endDate,
                    "tripAdvance": validAdvance,"tripBalance": validBalance,
                    "tripIncome": tripIncome,"tripKm": endKm - trip.startKm,
                    "paymentDate" : Date.now(),"remarks" : trip.remarks,
                    "discount" : trip.discount , "tripExpense": trip.tripExpense
                }
                const filePath = await generateInvoicePDF(invo);
                await sendInvoiceByEmail(trip.customerEmail,filePath);

        
                // You can use this filePath later to send via Gmail or WhatsApp
        
                res.status(200).json(200);
            } catch (error) {
                console.error('Error ending trip and generating invoice:', error);
                res.status(500).json({ message: error.message });
            }
    
            res.status(200).json(trip);
    
        } catch (error) {
            console.error("Error ending trip:", error);
            res.status(500).json({ message: error.message });
        }
    });


    module.exports = router;
