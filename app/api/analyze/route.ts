import { NextRequest, NextResponse } from 'next/server'
import { runFinancialAnalysis } from '@/lib/agents/graph'
import { FinancialData } from '@/lib/agents/types'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY not configured' },
        { status: 500 }
      )
    }

    const financialData: FinancialData = {
      monthlyIncome: parseFloat(data.monthlyIncome) || 0,
      otherIncome: parseFloat(data.otherIncome) || 0,
      housing: parseFloat(data.housing) || 0,
      utilities: parseFloat(data.utilities) || 0,
      food: parseFloat(data.food) || 0,
      transportation: parseFloat(data.transportation) || 0,
      entertainment: parseFloat(data.entertainment) || 0,
      otherExpenses: parseFloat(data.otherExpenses) || 0,
      debt: parseFloat(data.debt) || 0,
      debtInterest: parseFloat(data.debtInterest) || 0,
      currentSavings: parseFloat(data.currentSavings) || 0,
      riskTolerance: data.riskTolerance || 'moderate',
      goals: data.goals || '',
    }

    const result = await runFinancialAnalysis(financialData)

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Error analyzing financial data:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to analyze financial data' },
      { status: 500 }
    )
  }
}
