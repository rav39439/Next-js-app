'use client'

import { useEffect, useState } from 'react'

export default function HistoryPage() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true)
      setError(null)

      // Get email from localStorage (assuming you stored it at login)
      const user = localStorage.getItem('user')
      const email = user ? JSON.parse(user).email : null
      if (!email) {
        setError('No user email found. Please log in.')
        setLoading(false)
        return
      }

      try {
        const res = await fetch('https://python-image-credit.onrender.com/get_transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        })
        const data = await res.json()
        console.log(data)

        if (!res.ok) {
          throw new Error(data.detail || 'Failed to fetch history')
        }

        setHistory(data.transactions || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  if (loading) {
    return <main className="p-8 font-sans">Loading history…</main>
  }

  if (error) {
    return <main className="p-8 font-sans text-red-600">{error}</main>
  }

  return (
    <main className="p-8 max-w-2xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">User Transaction History</h1>
      {history.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((tx) => (
            <li
              key={tx.id}
              className="border rounded-lg p-4 hover:shadow-md transition"
            >
              <p><strong>ID:</strong> {tx.id}</p>
              <p><strong>Filename:</strong> ₹{tx.filename}</p>
              <p>
                <strong>Created_at</strong> {new Date(tx.created_at).toLocaleString()}
              </p>
              <p>
                <strong>Email:</strong>{tx.email}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
