import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { AgentState } from './types'

export async function debtAgent(state: AgentState): Promise<Partial<AgentState>> {
  const model = new ChatGoogleGenerativeAI({
    modelName: 'gemini-pro',
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.7,
  })

  const { financialData, income_analysis } = state

  const debt = Number(financialData.debt || 0)
  const debtInterest = Number(financialData.debtInterest || 0)

  if (debt === 0) {
    return {
      debt_analysis: {
        has_debt: false,
        analysis: 'Great news! You currently have no reported debt. This puts you in an excellent position to focus on savings and investments.',
      },
      messages: [...state.messages, 'Debt Agent: No debt detected'],
    }
  }

  const monthlyInterest = (debt * (debtInterest / 100)) / 12
  const debtToIncomeRatio = (debt / (income_analysis?.total_income * 12)) * 100

  const prompt = `You are a debt management specialist.

Given the following financial situation:
- Total Debt: $${debt}
- Interest Rate: ${debtInterest}%
- Monthly Interest Cost: $${monthlyInterest.toFixed(2)}
- Debt-to-Income Ratio: ${debtToIncomeRatio.toFixed(1)}%
- Monthly Net Savings: $${income_analysis?.net_savings || 0}

Provide a comprehensive debt management strategy that includes:
1. Assessment of the debt situation and its severity
2. Recommended debt payoff strategy (avalanche vs snowball method)
3. Suggested monthly debt payment amount
4. Timeline for becoming debt-free
5. How to balance debt repayment with other financial goals
6. Warning signs to watch for

Be specific with numbers and timelines. Keep recommendations realistic and actionable.`

  const response = await model.invoke(prompt)
  const analysis = response.content.toString()

  return {
    debt_analysis: {
      has_debt: true,
      total_debt: debt,
      interest_rate: debtInterest,
      monthly_interest: monthlyInterest,
      debt_to_income_ratio: debtToIncomeRatio,
      analysis,
    },
    messages: [...state.messages, `Debt Agent: Analyzed debt situation`],
  }
}
