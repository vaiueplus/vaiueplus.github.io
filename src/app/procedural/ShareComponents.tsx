import { LearningResourceInterface, UITopicInterface } from "@/data_structure";
import { LangCodeTable } from '@/static_data';
import { Combine_Path } from "@/utility/dynamic_utility";
import Link from "next/link";
import { useEffect } from "react";

// export function GetContentLanguage() : string {
//     let id = "item_language";
//     const cookieStore = cookies();

//     if (cookieStore.has(id)) {
//         let cookie = cookieStore.get(id);
//         if (cookie != undefined) cookie.value;
//     }
    
//     return "en";
// }

export function ShareSubjectComponent({topic_interface} : {topic_interface: UITopicInterface}) {
    return (
        <div className="subject_component">
            <img src={topic_interface.thumbnail == undefined ? "" : topic_interface.thumbnail} alt={topic_interface.title}></img>
            <div className="component_content">
                <h2 className="title is-4">{topic_interface.title}</h2>
                <p>{topic_interface.description}</p>
            </div>
        </div>
    );
}

export function ShareTopicComponent({topic_interface, is_link} : {topic_interface: UITopicInterface, is_link: boolean}) {
    let content = (
        <div>
            <h2 className="title is-5">{topic_interface.title}</h2>
            <p>{topic_interface.description}</p>
        </div>);

    let link_dom = (<Link className="topic_component" href={topic_interface.path}>{content}</Link>);
    let none_link_dom = (<div className="topic_component">{content}</div>);

    return ((is_link) ? link_dom : none_link_dom);
}

export function LearningItemComponent({topic_interface} : {topic_interface: LearningResourceInterface}) {
    return (
        <div className="learng_item_component" style={{backgroundImage: `url(${topic_interface.thumbnail})`}}>
                <h2 className="title is-3">{topic_interface.title}</h2>
                <p>{topic_interface.description}</p>

                <section>
                    <Link href="" className="video_button button is-primary is-rounded"><img src= {Combine_Path("texture/other/video_player.svg")} ></img><span>Learning Video</span></Link>
                </section>
        </div>
    );
}

