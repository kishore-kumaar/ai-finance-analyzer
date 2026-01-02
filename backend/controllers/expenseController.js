const Expense = require("../models/Expense");

// Add new expense or income
exports.addExpense = async (req, res) => {
  try {
    const { userId, title, amount, category, type, date } = req.body;

    const expense = await Expense.create({
      user: userId,
      title,
      amount,
      category,
      type,
      date,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all expenses for a user
exports.getExpenses = async (req, res) => {
  try {
    const { userId } = req.params;

    const expenses = await Expense.find({ user: userId }).sort({
      date: -1,
    });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
