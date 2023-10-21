import '../../../styles/globals.scss'
import { VerticalSideBarDom, HorizontalSideBarDom } from './sidebar/SideDomElements'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div id="platform">
        <aside><VerticalSideBarDom></VerticalSideBarDom><HorizontalSideBarDom></HorizontalSideBarDom></aside>
        <main>{children}</main>
    </div>
  )
}