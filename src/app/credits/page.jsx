
'use client'

import { useState } from 'react'

export default function CreditPage() {
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('https://python-image-credit.onrender.com/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          user_id: localStorage.getItem('user') 
            ? JSON.parse(localStorage.getItem('user')).id 
            : null,
          amount: parseInt(amount, 10)
        })
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || 'Failed to add credits')
      }

      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-8 max-w-md mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6">Add User Credits</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-600">{error}</p>}
        {result && (
          <p className="text-green-600">
            Success! You purchased {result.credits_added} credits.  
            Total credits: {result.total_credits}.
          </p>
        )}

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="user@example.com"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block mb-2 text-sm font-medium">
            Amount (₹)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
            min="10"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount in rupees"
          />
          <p className="text-xs text-gray-500 mt-1">
            (1 credit per ₹10, minimum ₹10)
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-5 py-2.5 text-white font-medium rounded-lg 
            ${loading ? 'bg-blue-400' : 'bg-blue-700 hover:bg-blue-800'} 
            focus:ring-4 focus:outline-none focus:ring-blue-300`}
        >
          {loading ? 'Processing…' : 'Add Credits'}
        </button>
      </form>
    </main>
  )
}
