import '/styles/globals.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <script src="https://accounts.google.com/gsi/client" async defer></script>

      <body>
        {children}
      </body>
    </html>
  )
}