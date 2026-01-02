const Expense = require("../models/Expense");

exports.getMonthSummary = async (req, res) => {
  try {
    const { userId, year, month } = req.params;

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, Number(month) + 1, 0, 23, 59, 59);

    const expenses = await Expense.find({
      user: userId,
      date: { $gte: startDate, $lte: endDate },
    });

    let totalIncome = 0;
    let totalExpense = 0;
    const categoryTotals = {};

    expenses.forEach((e) => {
      const amount = Number(e.amount);

      if (e.type === "income") {
        totalIncome += amount;
      } else {
        totalExpense += amount;
        categoryTotals[e.category] =
          (categoryTotals[e.category] || 0) + amount;
      }
    });

    res.json({
      totalIncome,
      totalExpense,
      categoryTotals,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
