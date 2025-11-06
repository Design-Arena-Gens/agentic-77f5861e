'use client'

import { useState } from 'react'
import FinancialForm from './components/FinancialForm'
import FinancialReport from './components/FinancialReport'

export default function Home() {
  const [report, setReport] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (data: any) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze financial data')
      }

      const result = await response.json()
      setReport(result)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Financial Assistant
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Multi-Agent System for Smart Personal Finance Management
          </p>
        </div>

        {!report ? (
          <FinancialForm onSubmit={handleSubmit} loading={loading} />
        ) : (
          <div>
            <button
              onClick={() => setReport(null)}
              className="mb-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              ← New Analysis
            </button>
            <FinancialReport report={report} />
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </main>
  )
}
