'use client'

import { Combine_API, Combine_Path, FormatString } from "@/utility/static_utility";
import {  set_cookie, get_unique_id} from "@/utility/dynamic_utility";
import { useNoteHeaderStore } from "../../../model/note_zustand";
import { useEffect } from "react";
import { API } from "@/api_data";

export const RenderNotePage = function() {

    return (
        <div className="note-comp">
            <NoteHeaderComp> </NoteHeaderComp>
            <hr></hr>
            <NoteBodyComp></NoteBodyComp>
        </div>
    );
}

const NoteHeaderComp = function(props:any) {
    return (
        <div className="note-header-comp">
            <h2>Notes</h2>
            <input className="input" type='text' placeholder="Search..."></input>
            <section className="note-header-actions">
                <button className="button is-primary">Add</button>
            </section>
        </div>
    );
}

const NoteBodyComp = function(props:any) {
    const note_list = useNoteHeaderStore((state) => state.notes);

    useEffect(() => {
        // let url = FormatString(API.GetHotTopicItem, [item_id]);
        //     url = Combine_API(url);
        let url = FormatString(API.GetHotTopicItem, [get_unique_id()]);
        
        fetch(Combine_API(url))
        .then(r => r.json())
        .then(data => {
            console.log(data.result)
            set_notes_func(data.result);
        });
      },[]);

    return (
        <div className="note-body-comp">

        {
            note_list.map(x=> {

                if (x.title == "" || x.title == undefined) return;

            return (
                <div className="note-item-comp" key={x.database_id}>
                <section>
                <p>{x.title}</p>
                <p>{x.last_edited_time}</p>
                </section>

                <object data={Combine_Path("texture/platform/expand.svg")} > </object>
                </div> )
            })
        }
        </div>
    );
}
