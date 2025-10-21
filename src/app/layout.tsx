export const metadata = {
  title: 'Deal Scraper',
  description: 'Find the latest deals from Instagram posts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
