import "./globals.css";
import StoreProvider from "./StoreProvider";
export const metadata = {
  title: "Black Drop | Premium Specialty Coffee",
  description:
    "Black Drop is a premium specialty coffee brand delivering bold flavors, expertly roasted beans, and an unforgettable coffee experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning = {true}>
      <body
        className="antialiased"
      >
        <StoreProvider>
        {children}
        </StoreProvider>
      </body>
    </html>
  );
}