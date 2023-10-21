import Link from "next/link";
import { Combine_Path } from '@/utility/dynamic_utility';

export const RenderMainComponent  = async () => {

    return (
        <div className="container">
        <div className="columns home_page_main">
            <br></br>
            <div className="column home_page_main_left">
                <div className="news_feed">
                    <span>News</span>
                    Stay connected to the upcoming & Recent jobs
                </div>

                <h1>Accelerate your working with AI</h1>
                <p className="block">We are here to help you take care of your legality with the best service especially for you</p>
                <Link className="home_page_main_start block" href="#">GET STARTED</Link>
                <br></br>
                <Link className="home_page_main_subscribe block" href="#">SUBSCRIBE</Link>
            </div>
        </div>
        </div>
    );

};