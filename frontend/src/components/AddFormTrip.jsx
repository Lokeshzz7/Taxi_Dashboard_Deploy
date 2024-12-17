import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../Config.js";

const AddFormTrip = ({ className = "" }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };
  const { tripId } = useParams();
  console.log("Trip ID from params:", tripId);
  const [formData, setFormData] = useState({
    driver: '',
    car: '',
    startDate: '',
    fare: '',
    fareType: '',
    balance: '',
    advance: '',
    startKm: '',
    endKm: '',
    customerName: '',
    customerPhoneNumber: '',
    customerAadhaarNumber: '',
    customerEmail: '',
    customerAddress: '',
    remarks: ''
  });

  const [drivers, setDrivers] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const driversResponse = await axios.get(`${BASE_URL}/api/drivers`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token in headers
          },
        });
        const carsResponse = await axios.get(`${BASE_URL}/api/cars`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token in headers
          },
        });
        setDrivers(driversResponse.data);
        setCars(carsResponse.data);

        if (tripId) {
          // Fetch the trip details to pre-fill the form
          const tripResponse = await axios.get(`${BASE_URL}/api/trips/admin/${tripId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
          });

          // Pre-fill form fields from the response, mapping API data to your formData structure
          setFormData({
            driver: tripResponse.data.driver._id || '', // assuming 'driver' key from API contains an object with '_id'
            car: tripResponse.data.car._id || '', // assuming 'car' key from API contains an object with '_id'
            startDate: tripResponse.data.startDate || '', // adjust based on API field
            startKm: tripResponse.data.startKm || '',
            endKm: tripResponse.data.endKm || '',
            advance: tripResponse.data.advance || '',
            fare: tripResponse.data.fare || '',
            notes: tripResponse.data.notes || '',
            customerName: tripResponse.data.customer.name || '',
            customerPhoneNumber: tripResponse.data.customer.contactNumber || '',
            customerAadhaarNumber: tripResponse.data.customer.AadhaarNo || '',
            fareType: tripResponse.data.fareType || '',
            customerEmail: tripResponse.data.customer.email || '',
            customerAddress: tripResponse.data.customer.address || '',
            remarks: tripResponse.data.remarks || ''

          });

          console.log(tripResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [tripId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form DT before submission : ", formData);
    try {
      if (tripId) {
        // If tripId exists, update the trip
        await axios.put(`${BASE_URL}/api/trips/admin/${tripId}`, formData, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        console.log("Form DT after submission : ", formData);
      } else {
        // If no tripId, create a new trip
        await axios.post(`${BASE_URL}/api/trips/admin/add`, formData, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
      }
      console.log("Form DT after submission : ", formData);
      console.log("Form submitted successfully ");

      navigate('/trips');
    } catch (error) {
      console.error('Error submitting trip:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return ''; // Return an empty string if dateString is falsy
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ''; // Return an empty string if the date is invalid
    return date.toISOString().split('T')[0]; // Extract only the date part
  };

  return (
    <div className={`w-full px-4 py-4 md:px-16 lg:px-32 text-left text-sm text-white z-0 ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <div className="relative flex items-center justify-center h-full w-full max-w-2xl mx-auto mt-16 mq750:ml-6">
            <div className="absolute shadow-md rounded-2xl bg-darkslateblue w-full h-full p-8 overflow-y-auto"></div>

            <div className="relative flex flex-col gap-6 z-50 w-full">
              <div className="flex flex-row gap-2">
                <div className="pb-6 font-semibold text-[25px] text-center">{tripId ? "Update Trip" : "Add Trip"}</div>
                <div className="absolute right-0 top-0">
                  <Button handleClick={handleBack} />
                </div>
              </div>
              {/* Customer Name & Number */}
              <div className="flex flex-col md:flex-row justify-between gap-4 text-lg font-bold">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-medium text-sm">Customer Name</label>
                  <div className="rounded-2xl flex items-center boz-[1] border-[1px] border-solid border-gray-200 p-4">
                    <input
                      name="customerName"
                      className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                      placeholder="Enter the customerName"
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-medium text-sm">Customer PhoneNumber</label>
                  <div className="rounded-2xl flex items-center boz-[1] border-[1px] border-solid border-gray-200 p-4">
                    <input
                      name="customerPhoneNumber"
                      className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                      placeholder="Enter the customerPhoneNo"
                      type="text"
                      value={formData.customerPhoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>


              </div>

              {/* Customer AadhaarNo & customerEmail */}
              <div className="flex flex-col md:flex-row justify-between gap-4 text-lg font-bold">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-medium text-sm">Customer AadhaarNo</label>
                  <div className="rounded-2xl flex items-center boz-[1] border-[1px] border-solid border-gray-200 p-4">
                    <input
                      name="customerAadhaarNumber"
                      className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                      placeholder="Enter the customerAadhaarNumber"
                      type="text"
                      value={formData.customerAadhaarNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-medium text-sm">Customer Email</label>
                  <div className="rounded-2xl flex items-center boz-[1] border-[1px] border-solid border-gray-200 p-4">
                    <input
                      name="customerEmail"
                      className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                      placeholder="Enter the customerEmail"
                      type="email"
                      value={formData.customerEmail}
                      onChange={handleChange}
                    />
                  </div>
                </div>


              </div>

              {/* Customer Address */}
              <div className="flex flex-col md:flex-row justify-between gap-4 text-lg font-bold">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-medium text-sm">Customer Address</label>
                  <div className="rounded-2xl flex items-center boz-[1] border-[1px] border-solid border-gray-200 p-4">
                    <input
                      name="customerAddress"
                      className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                      placeholder="Enter the customerAddress"
                      type="text"
                      value={formData.customerAddress}
                      onChange={handleChange}
                    />
                  </div>
                </div>




              </div>

              {/* Driver and Car */}
              <div className="flex flex-col md:flex-row justify-between gap-4 text-lg font-bold">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-medium text-sm">Driver</label>
                  <div className="rounded-2xl flex items-center border-[1px] border-solid border-gray-200 p-4">
                    <select
                      name="driver"
                      value={formData.driver}
                      onChange={handleChange}
                      className="w-full bg-[#111c44] border-none outline-none text-white"
                    >
                      <option value="">Select Driver</option>
                      {drivers
                        .filter(driver => driver.status === "available")
                        .map((driver) => (
                          <option key={driver._id} value={driver._id}>
                            {driver.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-medium text-sm">Car</label>
                  <div className="rounded-2xl flex items-center border-[1px] border-solid border-gray-200 p-4">
                    <select
                      name="car"
                      value={formData.car}
                      onChange={handleChange}
                      className="w-full bg-[#111c44] border-none outline-none text-white"
                    >
                      <option value="">Select Car</option>
                      {cars
                        .filter(car => car.status === "available")
                        .map((car) => (
                          <option key={car._id} value={car._id}>
                            {car.make}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Date and StartKm */}
              <div className="flex flex-col md:flex-row justify-between gap-4 text-lg font-bold">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-medium text-sm">Start Date</label>
                  <div className="rounded-2xl flex items-center border-[1px] border-solid border-gray-200 p-4">
                    <input
                      name="startDate"
                      className="w-full bg-transparent border-none outline-none text-secondary-grey-600"
                      type="date"
                      value={formatDate(formData.startDate)}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-medium text-sm">Starting KM</label>
                  <div className="rounded-2xl flex items-center border-[1px] border-solid border-gray-200 p-4">
                    <input
                      name="startKm"
                      className="w-full bg-transparent border-none outline-none text-secondary-grey-600"
                      type="number"
                      placeholder="Enter the starting Km"
                      value={formData.startKm}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Fare Type and Fare */}
              <div className="flex flex-col md:flex-row justify-between gap-4 text-lg font-bold">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-medium text-sm">Fare Type</label>
                  <div className="rounded-2xl flex items-center border-[1px] border-solid border-gray-200 p-4">
                    <select
                      name="fareType"
                      value={formData.fareType}
                      onChange={handleChange}
                      className="w-full bg-[#111c44] border-none outline-none text-white"
                    >
                      <option value="" disabled>Choose the fare type</option>
                      <option value="day">Day</option>
                      <option value="km">KM</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-medium text-sm">Fare</label>
                  <div className="rounded-2xl flex items-center border-[1px] border-solid border-gray-200 p-4">
                    <input
                      name="fare"
                      className="w-full bg-transparent border-none outline-none text-secondary-grey-600"
                      type="number"
                      placeholder="Enter the fare"
                      value={formData.fare}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              {/* <div className="flex flex-col gap-2 text-lg font-bold">
                <label className="font-medium text-sm">Notes</label>
                <div className="rounded-2xl flex items-center border-[1px] border-solid border-gray-200 p-4">
                  <input
                    name="notes"
                    className="w-full bg-transparent border-none outline-none text-secondary-grey-600"
                    type="text"
                    placeholder="Add any notes"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>
              </div> */}

              {/* Advance & Remarks */}
              <div className="flex flex-col md:flex-row justify-between gap-4 text-lg font-bold">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-medium text-sm">Advance</label>
                  <div className="rounded-2xl flex items-center boz-[1] border-[1px] border-solid border-gray-200 p-4">
                    <input
                      name="advance"
                      className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                      placeholder="Enter the advance"
                      type="text"
                      value={formData.advance}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label className="font-medium text-sm">Remarks</label>
                  <div className="rounded-2xl flex items-center boz-[1] border-[1px] border-solid border-gray-200 p-4">
                    <input
                      name="remarks"
                      className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                      placeholder="Enter the remarks"
                      type="text"
                      value={formData.remarks}
                      onChange={handleChange}
                    />
                  </div>
                </div>


              </div>


              {/* Submit */}
              <div className="flex flex-col items-center mt-4">
                <button
                  type="submit"
                  className="w-full md:w-[400px] rounded-2xl bg-primary-purple-blue-400 text-white py-3 px-4 font-medium text-lg cursor-pointer"
                >
                  {tripId ? "Update Trip" : "Add Trip"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFormTrip;
