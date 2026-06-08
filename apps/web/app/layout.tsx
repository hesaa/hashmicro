import { Geist, Geist_Mono, Inter, Roboto } from "next/font/google"

import "@hashmicro/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { NavSidebar } from "@/components/nav-sidebar"
import { cn } from "@hashmicro/ui/lib/utils";

const robotoHeading = Roboto({subsets:['latin'],variable:'--font-heading'});

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable, robotoHeading.variable)}
    >
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen">
            <NavSidebar />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
