'use client'
import { useNoteDictStore, useNoteFocusStore } from "@/model/note_zustand";
import { Descendant, Operation, createEditor } from 'slate'
import { useEffect, useMemo, useState, Fragment } from "react";
import { Combine_API, FormatString } from "@/utility/static_utility";
import { API } from "@/api_data";
import RenderSlatePretty, { ParseItemsToSlates, SlateToBlock } from "@/app/slate_editor/slate_pretty";
import RenderSlateContent from "@/app/slate_editor/slate_note_content";
import { GetEmptyNotePage, NoteBlockType, NotePageType, NoteRowType, NoteParagraphType, GetEmptyNoteBlock } from "@/model/note_data_struct";
import { RenderSourcePanel, RenderSideActionBar } from "./floating_panel";
import { MouseHelper } from "@/app/ui/mouse_helper";
import {v4 as uuidv4} from 'uuid';
import { FloatActionBarState } from "@/data_structure";
import { AbstractMovable } from "@/app/ui/movable_view";

export const RenderPreviewPage = function() {
    let floatActionbar = new RenderSideActionBar()
    let floatSourcePanel = new RenderSourcePanel()
    const focus_note_id = useNoteFocusStore((state) => state.note_id);
    const note_dict = useNoteDictStore();

    const get_note_by_id= useNoteDictStore((state) => state.get);
    const set_note_dict = useNoteDictStore((state) => state.set);

    // //OnDestroy
    useEffect(() => {
        let mouse_helper = new MouseHelper();
        mouse_helper.register_mouse_down((pos) => {
            floatSourcePanel.mouse_down_event(pos);
            floatActionbar.mouse_down_event(pos);
        });
        console.log("useEffect");

        return () => {
            console.log("Destroy");
            mouse_helper.dispose();
        };
    }, []);

    const get_block = function(block_id: string) {
        let notePage = get_note_by_id(focus_note_id);
        let block_index = notePage?.blocks.findIndex(x=>x.id == block_id);
        if (notePage == null || block_index == undefined || block_index < 0) return;

        return notePage.blocks[block_index];
    }
    
    const change_block_value = function(block_id: string, operation: (block: NoteBlockType) => NoteBlockType) {
        let notePage = get_note_by_id(focus_note_id);
        let block_index = notePage?.blocks.findIndex(x=>x.id == block_id);
        
        if (notePage == null || block_index == undefined || block_index < 0) return;
        
        notePage.blocks[block_index] = operation(notePage.blocks[block_index]);
        note_dict.set(notePage);
    }

//#region UI Event
    const on_slate_title_change = function(id: string, value: any[]) {

        let paragraph : NoteRowType[] = 
        value.map( x => {
            return {
                type: x.type,
                children: x.children,
            }
        });
        
        change_block_value(id, (block: NoteBlockType) => {
            block.row = paragraph;
            return block;
        });
    }

    const on_action_bar_click = function(id: string) {
        ShowFloatingBoard(floatActionbar);
        let block = get_block(id);

        if (block == null) return;

        floatActionbar.setCallback(id, on_action_bar_state_click);
        floatSourcePanel.setCallback(id, (block.source == null) ? "" : block.source, on_source_link_set);
    }

    const on_action_bar_state_click = function(block_id:string, state: FloatActionBarState) {
        if (state == FloatActionBarState.AI_Source) {
            ShowFloatingBoard(floatSourcePanel);
            floatActionbar.show(false);
        }
    }

    const on_source_link_set = function(id: string, link: string) {
        console.log("From link " + link);

        change_block_value(id, (block: NoteBlockType) => {
            block.source = link;
            return block;
        });
    }
//#endregion

    const render_slate_contents = function() {
        let noteFullBlock = get_note_by_id(focus_note_id);
        if (noteFullBlock == undefined) return <div></div>

        let initValue : React.JSX.Element[] = []; 

        return (
            <div>
                <h2>{noteFullBlock.title}</h2>

                <div key={noteFullBlock.blocks[0].id} className="note-block-comp">
                    <RenderSlateContent index={0} id={noteFullBlock.blocks[0].id} default_data={noteFullBlock.blocks[0].row}
                    readOnly={false} placeholder_text="Topic . . ."
                    finish_edit_event={on_slate_title_change} action_bar_event={(id) => {}}></RenderSlateContent>
                </div>

                <Fragment>
                {
                    noteFullBlock.blocks.reduce((array, x, index) => {
                        if (index == 0) return array;

                        array.push(
                            <div key={x.id} className="note-block-comp">
                                <RenderSlateContent id={x.id} default_data={x.row} index={index}
                                readOnly={false} 
                                finish_edit_event={on_slate_title_change} 
                                action_bar_event={on_action_bar_click}
                                placeholder_text="Text from gpt"></RenderSlateContent>
                            </div>
                        );

                        return array;
                    }, initValue)
                }
                </Fragment>

                <button className="button is-primary is-light" onClick={add_block}>Add+</button>
                { floatSourcePanel.render() }
                { floatActionbar.render() }
            </div>
        )
    }

    const add_block = function() {
        add_new_row();
    }

    const add_new_row = function() {
        let noteFullBlock = get_note_by_id(focus_note_id);
        if (noteFullBlock == null) return;

        let new_block = GetEmptyNoteBlock();
        new_block.id = uuidv4();
        noteFullBlock.blocks.push(new_block);

        note_dict.set(noteFullBlock);
    }

    return (
        <div className="preview-comp">
            { render_slate_contents() }
        </div>
    );
}

const ShowFloatingBoard = function(floating: AbstractMovable) {
    floating.show(true);
    floating.set_position(MouseHelper.x, MouseHelper.y);
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