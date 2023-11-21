import '../../../styles/globals.scss'
import { RenderHeaderComponent } from '../home_page_component/header_comonent'
import { RenderHomeFooter } from '../home_page_component/footer_component'
import { ProcessOnPageLoadedEvent } from '../home_page_component/home_page_client'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div id="home_page">
      <RenderHeaderComponent></RenderHeaderComponent>
      {children}
      <RenderHomeFooter></RenderHomeFooter>
      <ProcessOnPageLoadedEvent></ProcessOnPageLoadedEvent>
    </div>
  )
}