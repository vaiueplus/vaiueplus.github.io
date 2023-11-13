import { Combine_Path } from "@/utility/static_utility";
import Link from "next/link";


export const RenderHomeFooter = function() {

    return (
        <footer className="homepage_footer">
        <div className="container">
            <div className="columns">

            <p className="column">
                @2023 VAIUE, All rights reserve
            </p>

            <section className="column">
                <Link href=""><img src={Combine_Path("texture/icon/instagram.png")}></img></Link>
                <Link href=""><img src={Combine_Path("texture/icon/youtube.png")}></img></Link>
            </section>

            </div>
        </div>
        </footer>
    );
}