import Link from "next/link";
import { Combine_Path } from '@/utility/dynamic_utility';

export const RenderMainComponent  = async () => {

    return (
        <div className="home_page_main" style={{backgroundImage: "url('./texture/other/home_page_side.png')"}}>

            <div className="container">
            <div className="columns">
                <br></br>
                <div className="column home_page_main_left">
                    <div className="news_feed">
                        <span>最新消息</span>
                        Stay connected to the upcoming & Recent jobs
                    </div>

                    <h1>用AI加速你的法律工作流程</h1>

                    <section className="block">
                    <p>讓All-in-one平台提供最新且最正確的AI工具&資訊</p>
                    <p>讓您在工作流程上更加快速且高效率, 在法律學習&工作流程上更加得心應手</p>
                    </section>
                    <Link className="home_page_main_start block" href="/platform/">開始試用</Link>
                    <br></br>
                    <Link className="home_page_main_subscribe block" href="#home_page_subscription">訂閱最新消息</Link>
                </div>
            </div>

        </div>
        </div>
    );

};