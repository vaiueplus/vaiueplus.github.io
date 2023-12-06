'use client'

import { Combine_API, Combine_Path, FormatString } from "@/utility/static_utility";
import {  set_cookie, get_unique_id} from "@/utility/dynamic_utility";
import { useNoteFocusStore, useNoteDictStore } from "../../../model/note_zustand";
import { useEffect, useState } from "react";
import { API } from "@/api_data";
import { useAccountStore } from "@/model/account_zustand";
import { UserSSO_Struct } from "@/data_structure";
import {v4 as uuidv4} from 'uuid';
import { GetEmptyNotePage, NotePageType, NoteRowType } from "@/model/note_data_struct";

export const RenderNotePage = function() {

    return (
        <div className="note-comp">
            <NoteHeaderComp></NoteHeaderComp>
            <NoteBodyComp></NoteBodyComp>
        </div>
    );
}

const NoteHeaderComp = function(props:any) {
    const notes = useNoteDictStore((state) => state.notes_array);
    const set_note_dict = useNoteDictStore((state) => state.set);
    const note_focus_set = useNoteFocusStore((state) => state.set_id);

    function create_new_note() {
        let new_block : NotePageType = GetEmptyNotePage();
            new_block._id = uuidv4();
            new_block.title = "Note #" + (notes.count() + 1);
            new_block.date = new Date().toDateString();
            new_block.blocks[0]._id = uuidv4();

        set_note_dict(new_block);
        note_focus_set(new_block._id);
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
    const note_list = useNoteDictStore((state) => state.notes_array);
    const get_note_block = useNoteDictStore((state) => state.get)
    const note_focus_set = useNoteFocusStore((state) => state.set_id);
    const note_focus_id = useNoteFocusStore((state) => state.note_id);

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
        
            <div className="note-item-container">
            {
                note_list.map(x=> {
                    let note_block = get_note_block(x);

                if (note_block == undefined) return;
                
                let note_item_class = "note-item-comp"
                if (note_focus_id == note_block._id) note_item_class += " active"; 
                return (
                    <div className={note_item_class} key={note_block._id} onClick={ () => {
                        note_focus_set(note_block?._id)
                    } }>
                    
                    <section>
                    <p>{note_block.title}</p>
                    <p>{note_block.date}</p>
                    </section>
                    {/* <object data={Combine_Path("texture/platform/expand.svg")} > </object> */}
                    </div> )
                })
            }
            </div>
        </div>
    );
}
