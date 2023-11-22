import '../../../styles/globals.scss'
import { NoteFloatingBar } from './note/note_floating_bar'
import { VerticalSideBarDom, HorizontalSideBarDom } from './sidebar/SideDomElements'
import { ExecLoginComponent } from './tools/login_component';

function process_middleware() {

}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  process_middleware();

  return (
    <div id="platform">
        <aside><VerticalSideBarDom></VerticalSideBarDom><HorizontalSideBarDom></HorizontalSideBarDom></aside>
        <main>
          <ExecLoginComponent></ExecLoginComponent>
          <NoteFloatingBar></NoteFloatingBar>
          {children}
          </main>
    </div>
  )
}