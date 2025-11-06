import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { AgentState } from './types'

export async function budgetAgent(state: AgentState): Promise<Partial<AgentState>> {
  const model = new ChatGoogleGenerativeAI({
    modelName: 'gemini-pro',
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.7,
  })

  const { financialData, income_analysis } = state

  const totalIncome = income_analysis?.total_income || 0
  const expenseBreakdown = income_analysis?.expense_breakdown || []

  const prompt = `You are a budget optimization specialist.

Given the following financial situation:
- Total Monthly Income: $${totalIncome}
- Current Expense Breakdown:
${expenseBreakdown.map((e: any) => `  - ${e.name}: $${e.value} (${((e.value / totalIncome) * 100).toFixed(1)}%)`).join('\n')}

Using the 50/30/20 budgeting rule as a framework:
- 50% Needs (housing, utilities, food, transportation)
- 30% Wants (entertainment, dining out, hobbies)
- 20% Savings & Debt Repayment

Provide a comprehensive budget optimization plan:
1. Compare current spending to the 50/30/20 framework
2. Identify specific categories where spending is too high
3. Provide realistic reduction targets for each overspent category
4. Suggest practical ways to reduce expenses without sacrificing quality of life
5. Create an optimized budget allocation
6. Estimate how much extra can be saved per month with optimizations

Be specific with dollar amounts and percentages. Focus on practical, achievable changes.`

  const response = await model.invoke(prompt)
  const analysis = response.content.toString()

  return {
    budget_optimization: {
      current_allocation: expenseBreakdown,
      total_income: totalIncome,
      analysis,
    },
    messages: [...state.messages, `Budget Agent: Created budget optimization plan`],
  }
}
