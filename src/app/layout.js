import "./globals.css";
import { Provider } from "@/components/ui/provider";

export const metadata = {
  title: "Dream Archives ✧",
  description: "Welcome back.",
  openGraph: {
    title: "Dream Archives ✧",
    description: "Welcome back.",
    images: ["/images/thumbnail.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="apple-mobile-web-app-title"
          content="Dream Archives ✧"
          href="/images/thumbnail.jpg"
        />
      </head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
