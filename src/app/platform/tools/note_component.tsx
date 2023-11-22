'use client'

import { Combine_API, Combine_Path, FormatString } from "@/utility/static_utility";
import {  set_cookie, get_unique_id} from "@/utility/dynamic_utility";
import { useNoteHeaderStore, useNoteFocusStore } from "../../../model/note_zustand";
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
    const note_focus_set = useNoteFocusStore((state) => state.set_id);
    const note_focus_id = useNoteFocusStore((state) => state.note_id);

    return (
        <div className="note-body-comp">

        {
            note_list.map(x=> {
                if (x.title == "" || x.title == undefined) return;
                let date = new Date(x.last_edited_time);
            
            let note_item_class = "note-item-comp"
            if (note_focus_id == x._id) note_item_class += " active"; 

            return (
                <div className={note_item_class} key={x._id} onClick={ () => {
                    note_focus_set(x._id)
                } }>
                <section>
                <p>{x.title}</p>
                <p>{date.toLocaleTimeString("en-US")}</p>
                </section>

                <object data={Combine_Path("texture/platform/expand.svg")} > </object>
                </div> )
            })
        }
        </div>
    );
}
