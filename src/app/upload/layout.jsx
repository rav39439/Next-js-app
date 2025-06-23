export const metadata = {
  title: "Image Proccessing Platform",
  description: "Credit-based image processing platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 font-sans">
        {/* <header className="bg-white shadow px-6 py-4">
          <h1 className="text-xl font-bold">Upload a File</h1>
        </header> */}

        <main className="max-w-4xl mx-auto p-6">{children}</main>

        {/* <footer className="text-center text-sm py-6 text-gray-500">
          © {new Date().getFullYear()} My SaaS Inc.
        </footer> */}
      </body>
    </html>
  );
}