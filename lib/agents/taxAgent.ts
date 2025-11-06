import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { AgentState } from './types'

export async function taxAgent(state: AgentState): Promise<Partial<AgentState>> {
  const model = new ChatGoogleGenerativeAI({
    modelName: 'gemini-pro',
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.7,
  })

  const { financialData, income_analysis } = state

  const annualIncome = (income_analysis?.total_income || 0) * 12
  const monthlySavings = income_analysis?.net_savings || 0

  const prompt = `You are a tax optimization specialist.

Given the following financial profile:
- Estimated Annual Income: $${annualIncome}
- Monthly Savings Capacity: $${monthlySavings}
- Financial Goals: ${financialData.goals || 'Not specified'}

Provide tax optimization strategies including:
1. Estimated tax bracket and effective tax rate
2. Tax-advantaged retirement accounts (Traditional IRA, Roth IRA, 401k)
   - Contribution limits for current year
   - Tax savings potential
   - Which accounts to prioritize
3. Other tax deductions and credits to consider:
   - Health Savings Account (HSA)
   - Education credits
   - Charitable contributions
4. Tax-efficient investment strategies
5. Year-end tax planning tips
6. Estimated annual tax savings from implementing these strategies

Be specific with dollar amounts and current year contribution limits. Focus on legal, ethical tax optimization strategies.`

  const response = await model.invoke(prompt)
  const analysis = response.content.toString()

  return {
    tax_optimization: {
      annual_income: annualIncome,
      analysis,
    },
    messages: [...state.messages, `Tax Agent: Generated tax optimization strategies`],
  }
}
