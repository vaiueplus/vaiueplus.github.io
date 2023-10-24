import {RenderHeaderComponent} from './home_page_component/header_comonent';
import {RenderMainComponent} from './home_page_component/main_body_component';
import {RenderVideoIntroComponent} from './home_page_component/video_intro_component';
import {RenderBenefitComponent} from './home_page_component/benefit_component';
import { RenderStatsComponent } from './home_page_component/stats_component';
import { RenderSubscriptionComponent } from './home_page_component/subscription_compoenent';
import { RenderHomeFooter } from './home_page_component/footer_component';
import { ProcessOnPageLoadedEvent } from './home_page_component/home_page_client';

export default function Home() {

  return (
    <div id='home_page'>
      <RenderHeaderComponent></RenderHeaderComponent>
      <RenderMainComponent></RenderMainComponent>
      <RenderVideoIntroComponent></RenderVideoIntroComponent>
      <RenderBenefitComponent></RenderBenefitComponent>
      <RenderStatsComponent></RenderStatsComponent>
      <RenderSubscriptionComponent></RenderSubscriptionComponent>
      <RenderHomeFooter></RenderHomeFooter>
      <ProcessOnPageLoadedEvent></ProcessOnPageLoadedEvent>
    </div>
  )
}
