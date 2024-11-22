const express = require("express");
const router = express.Router();
const Car = require("../models/carModel.js");
const Trip = require("../models/tripModel.js");
const Income = require("../models/incomeModel.js");
const fs = require("fs");
const path = require("path");
const { authMiddleware, adminMiddleware } = require("../authMiddleware.js");

router.put("/admin/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const updatedIncome = await Income.findByIdAndUpdate(
      id,
      {
        $set: {
          carMaintenance: updates.carMaintenance || 0,
          driverExpense: updates.driverExpense || 0, // Update driverExpense in Income
          extraExpense: updates.extraExpense || 0, // Update extraExpense in Income
        },
      },
      { new: true }
    );

    // 2. If carMaintenance is provided, update the Car model
    if (updates.carMaintenance) {
      const income = await Income.findById(id);
      const carData = await Car.findById(income.car);

      // Add carMaintenance to the car's expenses field
      carData.expenses += updates.carMaintenance;
      await carData.save();
    }

    res.status(200).json(updatedIncome);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/admin/:id/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    if (updates.carMaintenance) {
      const income = await Income.findById(id);
      const carData = await Car.findById(income.car);
      carData.expenses += updates.carMaintenance;
      await carData.save();
    }
    const income = await Income.findByIdAndUpdate(id, updates, { new: true });
    await income.save();
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get(
  "/admin/total-income-expenses",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const incomes = await Income.aggregate([
        {
          $group: {
            _id: null,
            totalIncome: { $sum: "$tripIncome" },
            totalExpenses: {
              $sum: {
                $add: [
                  { $ifNull: ["$carMaintenance", 0] },
                  { $ifNull: ["$driverExpense", 0] },
                  { $ifNull: ["$extraExpense", 0] },
                ],
              },
            },
          },
        },
      ]);

      console.log("Aggregation result: ", incomes);

      if (incomes.length > 0) {
        const { totalIncome, totalExpenses } = incomes[0];
        return res.status(200).json({ totalIncome, totalExpenses });
      } else {
        return res.status(200).json({ totalIncome: 0, totalExpenses: 0 });
      }
    } catch (error) {
      console.error("Error fetching total income and expenses:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

router.get(
  "/admin/total-expense/:incomeId",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { incomeId } = req.params; // Get incomeId from the route parameters

    try {
      // Log the income ID
      console.log("Income ID:", incomeId);

      // Fetch the income data including expenses for the specific income ID
      const incomeData = await Income.findById(incomeId);

      // Log the income data to see the expenses
      console.log("Income Data:", incomeData);

      // If incomeData is not found, handle this case
      if (!incomeData) {
        return res.status(404).json({ message: "Income not found" });
      }

      // Aggregate expenses for the specific income ID
      const aggregatedExpenses = await Income.aggregate([
        {
          $match: {
            _id: new ObjectId(incomeId), // Ensure incomeId is converted to ObjectId
          },
        },
        {
          $group: {
            _id: null,
            totalExpenses: {
              $sum: {
                $add: [
                  { $ifNull: ["$carMaintenance", 0] },
                  { $ifNull: ["$driverExpense", 0] },
                  { $ifNull: ["$extraExpense", 0] },
                ],
              },
            },
          },
        },
      ]);

      // Log the aggregation result
      console.log("Aggregation Result: ", aggregatedExpenses);

      if (aggregatedExpenses.length > 0) {
        return res
          .status(200)
          .json({ totalExpense: aggregatedExpenses[0].totalExpenses });
      } else {
        return res.status(200).json({ totalExpense: 0 });
      }
    } catch (error) {
      console.error("Error fetching total expense:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

// Route to get monthly income and expenses summary
router.get("/monthly-summary", async (req, res) => {
  try {
    const currentDate = new Date();

    // Aggregation pipeline to calculate monthly totals
    const monthlyData = await Income.aggregate([
      {
        // Group by year and month to get monthly totals
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalIncome: { $sum: "$tripIncome" },
          totalDriverExpense: { $sum: "$driverExpense" },
          totalCarMaintenance: { $sum: "$carMaintenance" },
          totalExtraExpense: { $sum: "$extraExpense" },
        },
      },
      {
        // Add calculated fields for totalExpense, grossProfit, and netProfit
        $addFields: {
          totalExpense: {
            $add: [
              "$totalDriverExpense",
              "$totalCarMaintenance",
              "$totalExtraExpense",
            ],
          },
          grossProfit: "$totalIncome",
          netProfit: {
            $subtract: [
              "$totalIncome",
              {
                $add: [
                  "$totalDriverExpense",
                  "$totalCarMaintenance",
                  "$totalExtraExpense",
                ],
              },
            ],
          },
        },
      },
      {
        // Sort by year and month in ascending order
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    // Log all monthly data for debugging
    console.log(
      "Monthly Data Before Response:",
      JSON.stringify(monthlyData, null, 2)
    );

    // Adjust for current partial month if applicable
    monthlyData.forEach((item) => {
      const isCurrentMonth =
        item._id.year === currentDate.getFullYear() &&
        item._id.month === currentDate.getMonth() + 1;
      if (isCurrentMonth) {
        item.partialMonth = true;
      }
    });

    // Respond with monthly data
    res.json(monthlyData);
  } catch (error) {
    console.error("Error in fetching monthly summary:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the monthly summary." });
  }
});

module.exports = router;

router.get("/admin/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const tripId = req.params.id;
    // Define the file path for the invoice PDF
    const filePath = path.join(__dirname, `../invoices/invoice_${tripId}.pdf`);

    // Log the file path for debugging
    console.log(`Checking for file at: ${filePath}`);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      console.log(`File found: ${filePath}`);

      // Set headers for file download
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="invoice_${tripId}.pdf"`
      );

      // Serve the PDF file
      return res.sendFile(filePath);
    } else {
      console.error(`File not found for trip ID: ${tripId}`);
      return res.status(404).json({ message: "Invoice not found" });
    }
  } catch (error) {
    console.error("Error fetching invoice:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
