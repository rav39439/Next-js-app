'use client'

import { useState } from 'react'

export default function HomePage() {
  // --- State hooks for controlled inputs ---
  const [filename, setFilename] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  // --- Submit handler runs in browser, so FormData is defined ---
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!filename.trim()) {
      alert('Please enter a filename.')
      return
    }
    if (!file) {
      alert('Please select a file.')
      return
    }

    setLoading(true)
    try {
      // Build form data
      const formData = new FormData()
      formData.append('filename', filename)
      formData.append('file', file)
      // pull email from localStorage (must have been set at login)
      const stored = localStorage.getItem('user')
      if (!stored) throw new Error('Not logged in')
      const { email } = JSON.parse(stored)
    console.log(email)
    console.log(file)

    console.log(filename)
      formData.append('email', email)

      // POST to your FastAPI upload route
      const res = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData
      })
      console.log(res)

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Upload failed')
      alert('✅ File uploaded successfully!')
    } catch (err) {
      alert(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-8 max-w-md mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6">Upload New File</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File name input */}
        <div>
          <label htmlFor="filename" className="block mb-2 text-sm font-medium">
            File Name
          </label>
          <input
            type="text"
            id="filename"
            value={filename}
            onChange={e => setFilename(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="my-image.jpg"
          />
        </div>

        {/* File picker */}
        <div>
          <label htmlFor="file_input" className="block mb-2 text-sm font-medium">
            Choose File
          </label>
          <input
            id="file_input"
            name="file"                        // name matches the append key
            type="file"
            accept="image/*"
            onChange={e => setFile(e.target.files[0])}
            required
            className="w-full text-sm border rounded-lg cursor-pointer p-2"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-5 py-2.5 text-white font-medium rounded-lg 
            ${loading ? 'bg-blue-400' : 'bg-blue-700 hover:bg-blue-800'} 
            focus:ring-4 focus:outline-none focus:ring-blue-300`}
        >
          {loading ? 'Uploading…' : 'Submit'}
        </button>
      </form>
    </main>
  )
}