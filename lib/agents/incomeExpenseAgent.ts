import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { AgentState } from './types'

export async function incomeExpenseAgent(state: AgentState): Promise<Partial<AgentState>> {
  const model = new ChatGoogleGenerativeAI({
    modelName: 'gemini-pro',
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.7,
  })

  const { financialData } = state

  const totalIncome = Number(financialData.monthlyIncome) + Number(financialData.otherIncome || 0)
  const totalExpenses =
    Number(financialData.housing) +
    Number(financialData.utilities) +
    Number(financialData.food) +
    Number(financialData.transportation) +
    Number(financialData.entertainment || 0) +
    Number(financialData.otherExpenses || 0)

  const netSavings = totalIncome - totalExpenses

  const expenseBreakdown = [
    { name: 'Housing', value: Number(financialData.housing) },
    { name: 'Utilities', value: Number(financialData.utilities) },
    { name: 'Food', value: Number(financialData.food) },
    { name: 'Transportation', value: Number(financialData.transportation) },
    { name: 'Entertainment', value: Number(financialData.entertainment || 0) },
    { name: 'Other', value: Number(financialData.otherExpenses || 0) },
  ].filter((item) => item.value > 0)

  const prompt = `You are a financial analyst specializing in income and expense analysis.

Given the following financial information:
- Total Monthly Income: $${totalIncome}
- Total Monthly Expenses: $${totalExpenses}
- Net Monthly Savings: $${netSavings}

Expense Breakdown:
${expenseBreakdown.map((e) => `- ${e.name}: $${e.value} (${((e.value / totalExpenses) * 100).toFixed(1)}%)`).join('\n')}

Provide a detailed analysis of:
1. Income sufficiency and stability
2. Expense patterns and their appropriateness
3. Savings rate and what it means for financial health
4. Key concerns or red flags in the spending pattern
5. Immediate recommendations for improving cash flow

Keep the analysis professional, actionable, and specific to the numbers provided.`

  const response = await model.invoke(prompt)
  const analysis = response.content.toString()

  return {
    income_analysis: {
      total_income: totalIncome,
      total_expenses: totalExpenses,
      net_savings: netSavings,
      savings_rate: ((netSavings / totalIncome) * 100).toFixed(1),
      expense_breakdown: expenseBreakdown,
      analysis,
    },
    messages: [...state.messages, `Income & Expense Agent: Analyzed income and expenses`],
  }
}
