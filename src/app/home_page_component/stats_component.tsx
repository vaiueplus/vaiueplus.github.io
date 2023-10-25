import { Combine_Path } from "@/utility/dynamic_utility";

export const RenderStatsComponent  = () => {

    return (
        <section className="home_page_stats">
        <div className="container">
            <h2>VAIUE擁有</h2>
            <p>透過All-in-one平台可以...</p>
            <br></br><br></br>

            <div className="columns">

                <div className="column">
                    <h2>30+</h2>
                    <p>AI工具</p>
                </div>

                <div className="column">
                    <h2>60% ↑</h2>
                    <p>節省時間</p>
                </div>

                <div className="column">
                    <h2>10+</h2>
                    <p>協作雲端工具</p>
                </div>
            </div>
        </div>
        </section>
    );

}