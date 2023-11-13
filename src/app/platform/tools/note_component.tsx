'use client'

import { Combine_Path } from "@/utility/static_utility";
import {  set_cookie, get_unique_id} from "@/utility/dynamic_utility";
import { useNoteHeaderStore } from "../note/note_struct";
import { useEffect } from "react";

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
    const set_notes_func = useNoteHeaderStore((state) => state.set);

    useEffect(() => {
        // let url = FormatString(API.GetHotTopicItem, [item_id]);
        //     url = Combine_API(url);
    
        fetch("http://localhost:8032/note_list/22203939")
        .then(r => r.json())
        .then(data => {
            console.log(data.result)
            set_notes_func(data.result);
        });
      },[]);

    console.log(get_unique_id());

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
                <img src= {Combine_Path("texture/platform/expand.png")}></img>
                </div> )
            })
        }
        </div>
    );
}
