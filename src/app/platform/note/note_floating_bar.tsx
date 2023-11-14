'use client'

import './note.scss';
import {Combine_API, Combine_Path, FormatString} from '@/utility/static_utility';
import {API} from '@/api_data';
import React, { useMemo, useEffect, useState } from 'react'
import {Database_Item, Notion_Header} from '@/data_structure';
import { set_cookie, get_cookie, get_unique_id} from "@/utility/dynamic_utility";
import { useNoteHeaderStore } from '../../../model/note_zustand';


export function NoteFloatingBar() {
    const set_notes_func = useNoteHeaderStore((state) => state.new);
    const note_list = useNoteHeaderStore((state) => state.notes);

    useEffect(() => {
        // let url = FormatString(API.GetHotTopicItem, [item_id]);
        //     url = Combine_API(url);
        let id = get_unique_id();
        console.log("UserID " + id);
        let url = FormatString(API.GetNoteList, [id]);

        fetch(Combine_API(url))
        .then(r => r.json())
        .then(data => {
            console.log(data)
            set_notes_func(data.result);
        });
      },[]);

    return (<div className='note-floating-bar'>
        <section className='container'>
                <img className='note-create-btn' src= {Combine_Path("texture/platform/add-note.png")} ></img>

                <div className='note-items'>
                {
                note_list.map(x=> {
                    if (x.title == "" || x.title == undefined) return;

                    return <NoteFloatingItemView notion_header={x} key={x.database_id}></NoteFloatingItemView>
                })
                }
                </div>
        </section>
    </div>)
}


function NoteFloatingItemView({notion_header} : {notion_header: Notion_Header}) {
    let date = new Date(notion_header.last_edited_time);

    return (
        <div className='note-floating-item'>
            <h3>{notion_header.title}</h3>
            <p>{date.toLocaleTimeString("en-US")}</p>
        </div>
    );
}