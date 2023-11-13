'use client'

import { Combine_Path } from "@/utility/static_utility";
import {  set_cookie, get_unique_id} from "@/utility/dynamic_utility";

export const RenderNotePage = function() {
    console.log(get_unique_id());

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
    return (
        <div className="note-body-comp">

            <div className="note-item-comp">
                <section>
                <p>Title: SOmehtig</p>
                <p>Create time</p>
                </section>
                <img src= {Combine_Path("texture/platform/expand.png")}></img>
            </div>


        </div>
    );
}