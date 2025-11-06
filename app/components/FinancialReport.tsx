'use client'

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface FinancialReportProps {
  report: any
}

export default function FinancialReport({ report }: FinancialReportProps) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d']

  return (
    <div className="space-y-8">
      {/* Summary Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Financial Analysis Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
            <p className="text-sm text-blue-600 dark:text-blue-300 font-medium">Total Income</p>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-200 mt-2">
              ${report.income_analysis?.total_income?.toLocaleString() || 0}
            </p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-300 font-medium">Total Expenses</p>
            <p className="text-3xl font-bold text-red-700 dark:text-red-200 mt-2">
              ${report.income_analysis?.total_expenses?.toLocaleString() || 0}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg">
            <p className="text-sm text-green-600 dark:text-green-300 font-medium">Net Savings</p>
            <p className="text-3xl font-bold text-green-700 dark:text-green-200 mt-2">
              ${report.income_analysis?.net_savings?.toLocaleString() || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Income & Expense Analysis */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Income & Expense Breakdown
        </h3>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {report.income_analysis?.analysis}
          </p>
        </div>

        {report.income_analysis?.expense_breakdown && (
          <div className="mt-8">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={report.income_analysis.expense_breakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: $${entry.value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {report.income_analysis.expense_breakdown.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Debt Analysis */}
      {report.debt_analysis && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Debt Management Strategy
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {report.debt_analysis.analysis}
            </p>
          </div>
        </div>
      )}

      {/* Savings Analysis */}
      {report.savings_analysis && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Savings & Emergency Fund
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {report.savings_analysis.analysis}
            </p>
          </div>
        </div>
      )}

      {/* Investment Recommendations */}
      {report.investment_recommendations && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Investment Strategy
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {report.investment_recommendations.analysis}
            </p>
          </div>
        </div>
      )}

      {/* Budget Optimization */}
      {report.budget_optimization && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Budget Optimization
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {report.budget_optimization.analysis}
            </p>
          </div>
        </div>
      )}

      {/* Tax Optimization */}
      {report.tax_optimization && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Tax Optimization Strategies
          </h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {report.tax_optimization.analysis}
            </p>
          </div>
        </div>
      )}

      {/* Master Strategy */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-6">
          Master Financial Strategy
        </h3>
        <div className="prose prose-invert max-w-none">
          <p className="whitespace-pre-wrap">
            {report.master_strategy?.strategy}
          </p>
        </div>

        {report.master_strategy?.action_items && (
          <div className="mt-6">
            <h4 className="text-xl font-bold mb-4">Action Items</h4>
            <ul className="space-y-2">
              {report.master_strategy.action_items.map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
