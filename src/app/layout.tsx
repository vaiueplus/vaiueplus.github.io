import '../../styles/globals.scss'
import { VerticalSideBarDom, HorizontalSideBarDom } from './sidebar/SideDomElements'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <aside><VerticalSideBarDom></VerticalSideBarDom><HorizontalSideBarDom></HorizontalSideBarDom></aside>
        <main>{children}</main>
      </body>
    </html>
  )
}