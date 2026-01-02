const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// 🔹 Get all expenses for a user
router.get("/:userId", async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.params.userId,
    }).sort({ date: -1 });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 Add new expense / income
router.post("/", async (req, res) => {
  try {
    const expense = new Expense(req.body);
    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 🔹 Delete an expense by ID
router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    await expense.deleteOne();

    res.json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔹 Update an expense / income
router.put("/:id", async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        amount: req.body.amount,
        category: req.body.category,
        type: req.body.type,
      },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;
