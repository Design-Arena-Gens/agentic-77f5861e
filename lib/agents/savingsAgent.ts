import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { AgentState } from './types'

export async function savingsAgent(state: AgentState): Promise<Partial<AgentState>> {
  const model = new ChatGoogleGenerativeAI({
    modelName: 'gemini-pro',
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.7,
  })

  const { financialData, income_analysis } = state

  const currentSavings = Number(financialData.currentSavings || 0)
  const monthlyExpenses = income_analysis?.total_expenses || 0
  const monthlySavings = income_analysis?.net_savings || 0

  const emergencyFundTarget = monthlyExpenses * 6
  const emergencyFundProgress = (currentSavings / emergencyFundTarget) * 100

  const prompt = `You are a savings and emergency fund specialist.

Given the following financial situation:
- Current Savings: $${currentSavings}
- Monthly Expenses: $${monthlyExpenses}
- Monthly Net Savings: $${monthlySavings}
- Emergency Fund Target (6 months expenses): $${emergencyFundTarget}
- Current Emergency Fund Coverage: ${(currentSavings / monthlyExpenses).toFixed(1)} months
- Progress to Target: ${emergencyFundProgress.toFixed(1)}%

Financial Goals: ${financialData.goals || 'Not specified'}

Provide a comprehensive savings strategy that includes:
1. Assessment of current savings adequacy
2. Priority ranking for building emergency fund vs other goals
3. Recommended monthly savings allocation
4. Timeline to reach 6-month emergency fund
5. Strategies to accelerate savings growth
6. Best practices for maintaining savings discipline

Be specific with numbers, timelines, and actionable steps.`

  const response = await model.invoke(prompt)
  const analysis = response.content.toString()

  return {
    savings_analysis: {
      current_savings: currentSavings,
      emergency_fund_target: emergencyFundTarget,
      emergency_fund_progress: emergencyFundProgress,
      months_covered: currentSavings / monthlyExpenses,
      monthly_savings_capacity: monthlySavings,
      analysis,
    },
    messages: [...state.messages, `Savings Agent: Analyzed savings and emergency fund`],
  }
}
