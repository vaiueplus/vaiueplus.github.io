import { Combine_Path } from "@/utility/dynamic_utility";

export const RenderSubscriptionComponent  = () => {

    return (
        <section className="home_page_subscription">
        <div className="container">
            <div className="columns">

                <div className="column is-three-quarters">
                    <h1>All-in-one, Join with AI!</h1>
                    <p>Request for a personalized budget for your legal problem.
                     We will send you a coupe options in 24 hours. You can have free consult , if a our first customer</p>

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