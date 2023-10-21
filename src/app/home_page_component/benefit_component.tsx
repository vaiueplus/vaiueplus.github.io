import { Combine_Path } from "@/utility/dynamic_utility";

export const RenderBenefitComponent  = () => {

    return (
        <section className="home_page_benefit">
        <div className="container">

            <div className="columns home_page_benefit_left">
                <div className="column">
                <h2>How do we help you on working?</h2>
                    <p>Save time and get the correct and latest AI tool information.</p>
                    <p>Learn how to use AI tools in your working.</p>
                    <p>Quickly switch between all AI tools on the same platform.</p>
                    <p>Manage all AI & cloud tools in one board.</p>
                </div>

                <div className="column home_page_benefit_right">
                    <div className="benefit_box">
                        <img src={Combine_Path("texture/icon/circle_layer.png")}></img>
                        <h3>Right AI tools of the industry</h3>
                        <p>You don’t have to research tools by ownself, we provide suitable tools for your working.</p>
                    </div>

                    <div className="benefit_box">
                        <img src={Combine_Path("texture/icon/bag.png")}></img>
                        <h3>Save time to know & learn about AI</h3>
                        <p>We have already sorted up all latest information, and then provided the learning videos.</p>
                    </div>


                    <div className="benefit_box">
                        <img src={Combine_Path("texture/icon/rocket.png")}></img>
                        <h3>All tools & documents in one platform</h3>
                        <p>Not have to find different AI tools & documents scattered all over the place.</p>
                    </div>


                    <div className="benefit_box">
                        <img src={Combine_Path("texture/icon/user_arrow.png")}></img>
                        <h3>More working values</h3>
                        <p>The platform also support users’ collaboration, and can manage all AI tools of subscription, and cloud tools of integration.</p>
                    </div>

                </div>
            </div>

        </div>
        </section>
    );

}