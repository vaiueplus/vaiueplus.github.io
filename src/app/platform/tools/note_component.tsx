'use client'

import { Combine_API, Combine_Path, FormatString } from "@/utility/static_utility";
import {  set_cookie, get_unique_id} from "@/utility/dynamic_utility";
import { useNoteHeaderStore, useNoteFocusStore, useNoteDictStore } from "../../../model/note_zustand";
import { useEffect, useState } from "react";
import { API } from "@/api_data";
import { useAccountStore } from "@/model/account_zustand";
import { UserSSO_Struct } from "@/data_structure";
import {v4 as uuidv4} from 'uuid';
import { GetEmptyNoteBlock, NoteFullBlock } from "@/model/note_data_struct";

export const RenderNotePage = function() {

    return (
        <div className="note-comp">
            <NoteHeaderComp></NoteHeaderComp>
            <NoteBodyComp></NoteBodyComp>
        </div>
    );
}

const NoteHeaderComp = function(props:any) {
    const note_push_zusland = useNoteHeaderStore((state) => state.push);
    const notes = useNoteHeaderStore((state) => state.notes);
    const set_note_dict = useNoteDictStore((state) => state.set);
    const note_focus_set = useNoteFocusStore((state) => state.set_id);

    function create_new_note() {

        let new_block : NoteFullBlock = GetEmptyNoteBlock();
            new_block.id = uuidv4();

        note_push_zusland(
            {
                _id: new_block.id,
                title: "Note #" + (notes.count() + 1),
                last_edited_time: new Date().toDateString(),                
            }
        );

        set_note_dict(new_block.id, new_block);
        note_focus_set(new_block.id);
    }
    
    return (
        <div className="note-header-comp">
            <h2>Notes</h2>
            <input className="input" type='text' placeholder="Search..."></input>
            <section className="note-header-actions">
                <button className="button is-primary" onClick={create_new_note}>Add</button>
            </section>
        </div>
    );
}

const NoteBodyComp = function(props:any) {
    const note_list = useNoteHeaderStore((state) => state.notes);
    const note_focus_set = useNoteFocusStore((state) => state.set_id);
    const note_focus_id = useNoteFocusStore((state) => state.note_id);
    const account_zusland = useAccountStore((state) => state.user)
    const account_validation = useAccountStore((state) => state.is_valid)
    const [is_account_valid, set_account_valid] = useState<boolean>(false);


    useEffect(() => {
        set_account_valid(account_validation());
    }, []);

    
    function RenderLoginMessage({is_login} : {is_login: boolean}) {
        if (!is_login)
            return <div className="note-body-login-require"></div>;
    }
    
    return (
        <div className="note-body-comp">
        <RenderLoginMessage is_login={is_account_valid}></RenderLoginMessage>
        
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
