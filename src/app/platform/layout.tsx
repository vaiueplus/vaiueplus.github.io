import '../../../styles/globals.scss'
import { NoteFloatingBar } from './note/note_floating_bar'
import { VerticalSideBarDom, HorizontalSideBarDom } from './sidebar/SideDomElements'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div id="platform">
        <aside><VerticalSideBarDom></VerticalSideBarDom><HorizontalSideBarDom></HorizontalSideBarDom></aside>
        <main>
          <NoteFloatingBar></NoteFloatingBar>
          {children}
          </main>
    </div>
  )
}