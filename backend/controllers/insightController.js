const Expense = require("../models/Expense");
const generateInsights = require("../services/openaiService");

exports.getInsights = async (req, res) => {
  try {
    const { userId } = req.params;
    const { year, month } = req.query;

    // Build query (month-aware if provided)
    let query = { user: userId, type: "expense" };

    if (year !== undefined && month !== undefined) {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(
        year,
        Number(month) + 1,
        0,
        23,
        59,
        59
      );
      query.date = { $gte: startDate, $lte: endDate };
    }

    const expenses = await Expense.find(query);

    // No data case
    if (expenses.length === 0) {
      return res.json({
        insights: ["No expense data available for this period."],
      });
    }

    // 🔹 TRY OPENAI FIRST
    try {
      const aiInsights = await generateInsights(expenses);
      return res.json({ insights: aiInsights });
    } catch (aiError) {
      console.log("OpenAI failed, using fallback logic");
    }

    // 🔹 FALLBACK LOGIC
    const total = expenses.reduce(
      (sum, e) => sum + Number(e.amount),
      0
    );

    const categoryTotals = {};
    expenses.forEach((e) => {
      categoryTotals[e.category] =
        (categoryTotals[e.category] || 0) + Number(e.amount);
    });

    const insights = [];

    for (let category in categoryTotals) {
      const percent = (
        (categoryTotals[category] / total) *
        100
      ).toFixed(1);

      if (percent > 40) {
        insights.push(
          `You are spending ${percent}% of your money on ${category}. Consider reducing this category.`
        );
      } else {
        insights.push(
          `${category} accounts for ${percent}% of your spending.`
        );
      }
    }

    res.json({ insights });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
