import { Database_Item, Notion_Header } from '@/data_structure';
import { List , Map } from 'immutable';
import {create} from 'zustand';

type NoteHeaderZusStore = {
    notes: List<Notion_Header>,
    new: (note_header: Notion_Header[]) => void,
    push: (note_header: Notion_Header) => void,
    remove: (id: string) => boolean,
    removeAll: () => void
}

type NoteBlockZusStore = {
    notes: Map <string, Database_Item>,
    set: (id: string, note: Database_Item) => void,
    remove: (id: string) => void,
}

type NoteFocusZusStore = {
    note_id: string,
    set_id: (id: string | undefined) => void,
    is_valid: () => boolean,
}

type NoteEditChangeZusStore = {
    change_flag: boolean,
    set_change_flag: (on: boolean) => void,
}

export const useNoteEditStore = create<NoteEditChangeZusStore>(
    (set, get) => ({
    change_flag: false,

    set_change_flag(on) {
        set( () => {
            return ({change_flag: on}) 
        });
    }
}));

export const useNoteFocusStore = create<NoteFocusZusStore>(
    (set, get) => ({
    note_id: "",
    set_id: (id: string | undefined) => {
        if(id == undefined) return;
        if(get().note_id == id) return;

        set( () => {
            return ({...get(), note_id: id}) 
        });
    },
    is_valid: () => get().note_id != undefined && get().note_id != ""
}));

export const useNoteHeaderStore = create<NoteHeaderZusStore>((set, get) => ({
    notes: List<Notion_Header>(),

    new: (note_header: Notion_Header[]) => {
        set( () => {
            return ({notes: List(note_header)}) 
        });
    },

    push: (note_header: Notion_Header) =>  {
        set( state => {
            return ({notes: state.notes.push(note_header)}) 
        });
    },

    remove: (id: string) => {
        let index = get().notes.findIndex(x=>x.database_id == id);
        if (index < 0) return false;

        set( state => {

            let index = state.notes.findIndex(x=>x.database_id == id);
            
            if (index >= 0)
                return ({ notes: state.notes.delete(index) });

            return ({notes: state.notes}) 
        });

        return true;
    },

    removeAll: () => {
        set( state => ({notes: state.notes.clear()}) );
    }
  }));