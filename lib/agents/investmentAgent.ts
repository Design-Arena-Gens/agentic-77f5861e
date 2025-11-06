import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { AgentState } from './types'

export async function investmentAgent(state: AgentState): Promise<Partial<AgentState>> {
  const model = new ChatGoogleGenerativeAI({
    modelName: 'gemini-pro',
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.7,
  })

  const { financialData, income_analysis, debt_analysis, savings_analysis } = state

  const riskTolerance = financialData.riskTolerance
  const monthlySavings = income_analysis?.net_savings || 0
  const hasDebt = debt_analysis?.has_debt || false
  const debtAmount = debt_analysis?.total_debt || 0
  const emergencyFundProgress = savings_analysis?.emergency_fund_progress || 0

  const prompt = `You are an investment advisor specializing in personal finance.

Given the following financial profile:
- Risk Tolerance: ${riskTolerance}
- Monthly Savings Capacity: $${monthlySavings}
- Current Debt: $${debtAmount}
- Emergency Fund Status: ${emergencyFundProgress.toFixed(1)}% complete
- Financial Goals: ${financialData.goals || 'Not specified'}

Provide personalized investment recommendations that include:
1. Whether it's the right time to start investing (considering debt and emergency fund)
2. Recommended investment vehicles based on risk tolerance:
   - Low risk: Bonds, CDs, high-yield savings
   - Moderate risk: Index funds, ETFs, balanced portfolios
   - High risk: Individual stocks, sector funds
3. Suggested asset allocation percentages
4. Monthly investment amount recommendation
5. Tax-advantaged accounts to consider (401k, IRA, etc.)
6. Long-term strategy for wealth building

Be specific about percentages, account types, and actionable steps. Consider the current debt and emergency fund situation in your recommendations.`

  const response = await model.invoke(prompt)
  const analysis = response.content.toString()

  return {
    investment_recommendations: {
      risk_tolerance: riskTolerance,
      monthly_investment_capacity: monthlySavings,
      analysis,
    },
    messages: [...state.messages, `Investment Agent: Generated investment recommendations`],
  }
}
