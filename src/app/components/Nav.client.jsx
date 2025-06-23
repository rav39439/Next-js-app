

'use client';
import { Geist, Geist_Mono } from "next/font/google";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // browser-only; read from localStorage
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <html lang="en">
      <body >
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Uploads</span>
            </a>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                {/* Conditionally render protected routes */}
                {isLoggedIn && (
                  <>
                    <li>
                      <a href="/upload/" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">Upload File</a>
                    </li>
                    <li>
                      <a href="/history/" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">History</a>
                    </li>
                    <li>
                      <a href="/credits/" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Add Credit</a>
                    </li>
                  </>
                )}

                {/* Always show login */}
                <li>
                  <a href="/login/" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500">Login</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </body>
    </html>
  
  );
}
