// export default function Login() {
//   return (
//     <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
//       <h1>Login</h1>

//       <form>
//         <div class="mt-6">
//           <label
//             for="email"
//             class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//           >
//             Email address
//           </label>
//           <input
//             type="email"
//             id="email"
//             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             placeholder="john.doe@company.com"
//             required
//           />
//         </div>
//         <div class="mb-6">
//           <label
//             for="password"
//             class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             placeholder="•••••••••"
//             required
//           />
//         </div>

        
//         <button
//           type="submit"
//           class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         >
//           Submit
//         </button>
//       </form>
//           <a className="mt-2" href="/register/" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Do not have a account? Sign Up</a>


//     </main>
//   );
// }


'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const formData=new FormData()
    formData.append('email',email)
    formData.append('password',password)

    try {
      const res = await fetch('http://localhost:8000/login', {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: formData
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.detail || 'Login failed')
      }

      // Store session in localStorage
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // Redirect
      router.push('/history')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-8 max-w-md mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-600">{error}</p>}

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
            placeholder="john.doe@company.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-5 py-2.5 text-white font-medium rounded-lg 
            ${loading ? 'bg-blue-400' : 'bg-blue-700 hover:bg-blue-800'} 
            focus:ring-4 focus:outline-none focus:ring-blue-300`}
        >
          {loading ? 'Logging in…' : 'Login'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Don’t have an account?{' '}
        <a href="/register" className="text-blue-600 hover:underline">
          Sign Up
        </a>
      </p>
    </main>
  )
}