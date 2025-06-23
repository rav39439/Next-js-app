export const metadata = {
  title: "Register",
  description: "Credit-based image processing platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 font-sans">
       
        <main className="max-w-4xl mx-auto p-6">{children}</main>

      </body>
    </html>
  );
}