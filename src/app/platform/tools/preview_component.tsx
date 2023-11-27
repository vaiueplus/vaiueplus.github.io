'use client'
import { useNoteFocusStore, useNoteEditStore } from "@/model/note_zustand";
import { Descendant, Operation, createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { useEffect, useMemo, useState } from "react";
import { Combine_API, FormatString } from "@/utility/static_utility";
import { API } from "@/api_data";
import { Database_Item, Notion_Block } from "@/data_structure";
import RenderSlatePretty, { ParseItemsToSlates, SlateToBlock } from "@/app/slate_editor/slate_pretty";
import RenderSlateContent from "@/app/slate_editor/slate_note_content";
import { NoteBlockType } from "@/model/note_data_struct";

export const RenderPreviewPage = function() {
    const note_list = useNoteFocusStore();
    const note_change_store = useNoteEditStore();

    const unsub_callback = useNoteFocusStore.subscribe((state) => {
        if (!state.is_valid()) return;

        console.log(state.note_id);
        // let url = FormatString(API.GetNoteBlock, [state.note_id]);
        //     url = Combine_API(url);

        // fetch(url)
        // .then(r => r.json())
        // .then(data => {
        //     let blocks : Notion_Block[] = data.result;
        //     editor.insertNodes(ParseItemsToSlates(blocks));
        //     setReadOnly(false);
        // });
    });

    const add_block = function() {
        
    }

    // //OnDestroy
    // useEffect(() => {
    //     return () => {
    //         note_change_store.set_change_flag(false);
    //         console.log("Destroy");
    //     };
    // }, []);

    return (
        <div className="preview-comp">

            {/* <div>        
            <button className="button is-primary is-light" disabled={!note_change_store.change_flag} 
                onClick={() => {
                    note_change_store.set_change_flag(false);

                    UpdateNotionBlock(note_list.note_id, descendents);
                }}>
                Save
            </button>

            </div> */}
            <h2>Note #111</h2>
            <RenderSlateContent default_data={[{type: 'paragraph', children: [{id: "", text: '' }]}]} 
            readOnly={false} placeholder_text="Enter your prompt theme here"></RenderSlateContent>

            {/* {
                 initialValue.map((x) => {
                    return <RenderSlateContent key={x.id} default_data={[x]} readOnly={readOnly}
                    placeholder_text="Enter some plain text..."></RenderSlateContent>
                })
            } */}

            <button className="button is-primary is-light" onClick={add_block}>Add Block</button>
        </div>
    );
}

const UpdateNotionBlock = function(node_id: string, descendents: Descendant[]) {
    let blocks = SlateToBlock(descendents);
    let url = Combine_API(API.PostNoteBlock);

    console.log(blocks);

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: node_id,
            data: blocks
        })
    });
}