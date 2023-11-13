import { Database_Item, Notion_Header } from '@/data_structure';
import { List , Map } from 'immutable';
import {create} from 'zustand';

type NoteHeaderZusStore = {
    notes: List<Notion_Header>,
    set: (note_header: Notion_Header[]) => void,
    add: (note_header: Notion_Header) => void,
    remove: (id: string) => boolean,
    removeAll: () => void
}

type NoteBlockZusStore = {
    notes: Map <string, Database_Item>,
    add: (id: string, note: Database_Item) => void,
    remove: (id: string) => void,
}

export const useNoteHeaderStore = create<NoteHeaderZusStore>((set, get) => ({
    notes: List<Notion_Header>(),

    set: (note_header: Notion_Header[]) => {
        set( () => {
            return ({notes: List(note_header)}) 
        });
    },

    add: (note_header: Notion_Header) =>  {
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