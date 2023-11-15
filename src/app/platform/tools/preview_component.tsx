'use client'
import { useNoteFocusStore, useNoteEditStore } from "@/model/note_zustand";
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { useEffect, useMemo, useState } from "react";
import { Combine_API, FormatString } from "@/utility/static_utility";
import { API } from "@/api_data";
import { Database_Item, Notion_Block } from "@/data_structure";
import RenderSlatePretty, { ParseItemsToSlates } from "@/app/slate_editor/slate_pretty";

export const RenderPreviewPage = function() {
    const note_list = useNoteFocusStore();
    const note_change_store = useNoteEditStore();
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const [readOnly, setReadOnly] = useState<boolean>(true);

    const unsub_callback = useNoteFocusStore.subscribe((state) => {
        if (!state.is_valid()) return;

        let url = FormatString(API.GetNoteBlock, [state.note_id]);
            url = Combine_API(url);

        fetch(url)
        .then(r => r.json())
        .then(data => {
            let blocks : Notion_Block[] = data.result;
            editor.insertNodes(ParseItemsToSlates(blocks));
            setReadOnly(false);
        });
    });

    //OnDestroy
    useEffect(() => {
        return () => {
            note_change_store.set_change_flag(false);
            console.log("Destroy");
        };
    }, []);

    if (note_list.note_id == "" || note_list.note_id == undefined) {
        return <div></div>;
    }

    return (
        <div className="preview-comp">
            <RenderSlatePretty editor={editor} default_data={[]} readOnly={readOnly} onChangeCallback={
                () => {
                    note_change_store.set_change_flag(true);
                }
            }></RenderSlatePretty>
            
            <button className="button is-primary is-light is-fullwidth" disabled={!note_change_store.change_flag} 
                onClick={() => {
                    note_change_store.set_change_flag(false);
                }}
            >Save</button>
        </div>
    );
}