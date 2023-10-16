'use client';
import {useState, useEffect} from 'react';

import { Combine_Path, get_cookie, set_cookie } from '@/utility/dynamic_utility';
import { GetSubjectComponent, GetTopicComponent, LawLearningJSON, PageIDTable, CoockeTable, LangCodeTable } from '@/static_data';
import { LearningItemComponent, ShareTopicComponent } from './ShareComponents';
import { LearningResourceInterface, UITopicInterface } from '@/data_structure';
import Link from 'next/link';

export const GetProceduralComponent = (topic_id : string) => {
    let parent_interface = GetSubjectComponent("SUBJECT_LAW_LEARNING");
    let topic_interface = GetTopicComponent(topic_id);
    let learning_comps : LearningResourceInterface[] = [];

    if (parent_interface == null || topic_interface == null) return (<div></div>);

    let current_lang = get_cookie(CoockeTable.Procedural_Language_Code, LangCodeTable.English);
    const [langcode, setLangCode] = useState<string>(current_lang);
    learning_comps = LawLearningJSON[topic_id].filter(x=>x.language == "" || x.language == langcode);
    
    console.log("Current Lang " + langcode);

    useEffect(() => {
        console.log("useEffect " + langcode);
    });

    function onLangCallback(code: string) {
        console.log(code);
        set_cookie(CoockeTable.Procedural_Language_Code, code, 30);
        setLangCode(code);
    }

	return <div>
        <div className='url_content'>
            <LearningTitleComponent key={topic_interface.id}
             parent_interface={parent_interface} topic_interface={topic_interface} lang_code={langcode} lang_callback={onLangCallback.bind(this)}  ></LearningTitleComponent>
            <br></br>

            <section className='item_component_section'>
                { learning_comps.map(x => { return <LearningItemComponent key={x.id} topic_interface={x}></LearningItemComponent>}) }
            </section>
        </div>
	</div>;
}

export function LearningTitleComponent({parent_interface, topic_interface, lang_code, lang_callback} : 
    {parent_interface : UITopicInterface, topic_interface: UITopicInterface, lang_code: string, lang_callback: (code: string) => void }) {

    useEffect(() => {
        var en_btn_dom : HTMLButtonElement | null = document.querySelector(".component_langs button:nth-of-type(1)");
        var cn_btn_dom : HTMLButtonElement | null = document.querySelector(".component_langs button:nth-of-type(2)");
        var kr_btn_dom : HTMLButtonElement | null = document.querySelector(".component_langs button:nth-of-type(3)");

        en_btn_dom?.classList.remove("is-focused");
        kr_btn_dom?.classList.remove("is-focused");
        cn_btn_dom?.classList.remove("is-focused");

        if (lang_code == LangCodeTable.English && en_btn_dom != null) {
            en_btn_dom.classList.add("is-focused");
        }

        if (lang_code == LangCodeTable.Mandarin_TW && cn_btn_dom != null) {
            cn_btn_dom.classList.add("is-focused");
        }

        if (lang_code == LangCodeTable.Korean && kr_btn_dom != null) {
            kr_btn_dom.classList.add("is-focused");
        }
    });
    // console.log(en_btn_class);
    return (
        <div className="learng_title_component">
            <div className="component_parent"><img src={parent_interface.thumbnail == undefined ? "" : parent_interface.thumbnail}></img></div>
            <Link href={parent_interface.path}><img src= {Combine_Path("texture/other/back.png")}></img></Link>
            <ShareTopicComponent is_link={false} topic_interface={topic_interface}></ShareTopicComponent>
            <div className="component_langs">
                <button className="button is-info" key={LangCodeTable.English} onClick={ () => lang_callback(LangCodeTable.English)}>EN</button>
                <button className="button is-info" key={LangCodeTable.Mandarin_TW} onClick={ () => lang_callback(LangCodeTable.Mandarin_TW)}>CH</button>
                <button className="button is-info" key={LangCodeTable.Korean} onClick={ () => lang_callback(LangCodeTable.Korean)}>KR</button>
            </div>
        </div>
    );
}
