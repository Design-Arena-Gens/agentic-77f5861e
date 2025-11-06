import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { AgentState } from './types'

export async function masterAgent(state: AgentState): Promise<Partial<AgentState>> {
  const model = new ChatGoogleGenerativeAI({
    modelName: 'gemini-pro',
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.7,
  })

  const {
    income_analysis,
    debt_analysis,
    savings_analysis,
    investment_recommendations,
    budget_optimization,
    tax_optimization,
    financialData,
  } = state

  const prompt = `You are the Master Financial Strategist, synthesizing insights from multiple specialized financial agents.

FINANCIAL PROFILE SUMMARY:
- Total Income: $${income_analysis?.total_income}/month
- Total Expenses: $${income_analysis?.total_expenses}/month
- Net Savings: $${income_analysis?.net_savings}/month
- Debt: $${debt_analysis?.total_debt || 0} at ${debt_analysis?.interest_rate || 0}%
- Current Savings: $${savings_analysis?.current_savings}
- Emergency Fund: ${savings_analysis?.months_covered.toFixed(1)} months covered
- Risk Tolerance: ${financialData.riskTolerance}
- Goals: ${financialData.goals || 'Not specified'}

SPECIALIZED AGENT INSIGHTS:

Income & Expense Analysis:
${income_analysis?.analysis}

${debt_analysis?.has_debt ? `Debt Management:\n${debt_analysis.analysis}` : 'No debt to manage.'}

Savings Strategy:
${savings_analysis?.analysis}

Investment Recommendations:
${investment_recommendations?.analysis}

Budget Optimization:
${budget_optimization?.analysis}

Tax Optimization:
${tax_optimization?.analysis}

As the Master Financial Strategist, provide:
1. A comprehensive, unified financial strategy that prioritizes all recommendations
2. A clear roadmap with specific timelines (30 days, 90 days, 6 months, 1 year)
3. Top 5-7 action items the user should implement immediately
4. How to balance competing priorities (debt vs savings vs investing)
5. Key metrics to track monthly
6. Expected financial outcomes if the plan is followed

Be clear, specific, and actionable. Create a cohesive strategy that integrates all specialist recommendations.`

  const response = await model.invoke(prompt)
  const strategyContent = response.content.toString()

  const actionItemsPrompt = `Based on this financial strategy, extract the top 5-7 most important action items as a simple list.

Strategy:
${strategyContent}

Return only the action items as a numbered list, one per line.`

  const actionResponse = await model.invoke(actionItemsPrompt)
  const actionItemsText = actionResponse.content.toString()

  const actionItems = actionItemsText
    .split('\n')
    .filter((line: string) => line.trim().length > 0)
    .map((line: string) => line.replace(/^\d+\.\s*/, '').trim())
    .filter((item: string) => item.length > 0)

  return {
    master_strategy: {
      strategy: strategyContent,
      action_items: actionItems,
    },
    messages: [...state.messages, `Master Agent: Synthesized comprehensive financial strategy`],
  }
}
