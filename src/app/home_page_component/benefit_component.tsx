import { Combine_Path } from "@/utility/dynamic_utility";

export const RenderBenefitComponent  = () => {

    return (
        <section className="home_page_benefit">
        <div className="container">

            <div className="columns home_page_benefit_left">
                <div className="column">
                <h2>AI如何在法律工作流程上對您有所幫助?</h2>
                    <p>幫忙節省時間找到最新且最正確的AI工具&資訊</p>
                    <p>快速了解&學習AI如何強化工作流程</p>
                    <p>All-in-one平台上獲得所需AI資訊與快速切換所需AI工具</p>
                    <p>統一管理所有AI工具與雲端協作工具</p>
                </div>

                <div className="column home_page_benefit_right">
                    <div className="benefit_box">
                        <img src={Combine_Path("texture/icon/circle_layer.png")}></img>
                        <h3>最新且最正確的產業AI工具&資訊</h3>
                        <p>不需要花費您的時間去找尋並篩選AI工具&資訊, 我們將會提供最新且最正確的AI情報.</p>
                    </div>

                    <div className="benefit_box">
                        <img src={Combine_Path("texture/icon/bag.png")}></img>
                        <h3>快速了解與學習並應用在工作流程上</h3>
                        <p>我們將會整理並提供所需的學習資源, 讓您可以更快了解與上手使用.</p>
                    </div>


                    <div className="benefit_box">
                        <img src={Combine_Path("texture/icon/rocket.png")}></img>
                        <h3>所需AI資訊&工具</h3>
                        <h3>All-in-one</h3>
                        <p>不需要頻繁切換找尋那些散落於各處的AI工具與檔案, 全部All-in-one.</p>
                    </div>


                    <div className="benefit_box">
                        <img src={Combine_Path("texture/icon/user_arrow.png")}></img>
                        <h3>統一管理與更多工作價值...</h3>
                        <p>All-in-one平台方便您工作管理外, 平台也可支援與他人&雲端協作</p>
                    </div>

                </div>
            </div>

        </div>
        </section>
    );

}