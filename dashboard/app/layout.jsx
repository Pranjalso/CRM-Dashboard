import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F5F7F6] text-[#0F172A]">
        {children}
      </body>
    </html>
  );
}
