import { Combine_Path } from "@/utility/dynamic_utility";

export const RenderSubscriptionComponent  = () => {

    return (
        <section className="home_page_subscription">
        <div className="container">
            <div className="columns">

                <div className="column is-three-quarters">
                    <h1>All-in-one, 開始AI加速 !</h1>
                    <p>想要了解更多最新且最正確的AI工具與資訊,</p>
                    <p>請訂閱追隨VAIUE!</p>

                    <br></br>
                    <div className="input_field">
                        <button><img src={Combine_Path("texture/icon/mail.png")}></img>Subscription</button>
                        <input placeholder="Email address"></input>
                    </div>
                </div>

                <div className="column">
                    <img src={Combine_Path("texture/other/subscription_demo.png")}></img>
                </div>
            </div>
        </div>
        </section>
    );

}