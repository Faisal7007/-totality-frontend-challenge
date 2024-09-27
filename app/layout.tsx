// RootLayout.tsx
"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./store/store"; // Adjust the path accordingly
import { AuthProvider } from "./context/AuthProvider";
import CartLoader from "./store/CartLoader"; // Adjust the path accordingly

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          <AuthProvider>
            <CartLoader /> 
            {children}
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
