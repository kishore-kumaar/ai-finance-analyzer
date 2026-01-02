
const OpenAI = require("openai");

console.log("OpenAI Key Loaded:", !!process.env.OPENAI_API_KEY);


async function generateInsights(expenses) {
  const expenseSummary = expenses.map((e) => {
    return `${e.category}: ₹${e.amount}`;
  });

  const prompt = `
You are a financial assistant.
Analyze the following expenses and give 3 short, practical insights.

Expenses:
${expenseSummary.join("\n")}
`;

  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful finance advisor." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  const text = response.choices[0].message.content;

  return text
    .split("\n")
    .filter((line) => line.trim() !== "");
}

module.exports = generateInsights;

