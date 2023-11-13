import { Database_Item, Notion_Header } from '@/data_structure';
import { List , Map } from 'immutable';
import {create} from 'zustand';

type NoteHeaderZusStore = {
    notes: List<Notion_Header>,
    set: (note_header: Notion_Header[]) => void,
    add: (note_header: Notion_Header) => void,
    remove: (id: string) => void,
    removeAll: () => void
}

type NoteBlockZusStore = {
    notes: Map <string, Database_Item>,
    add: (id: string, note: Database_Item) => void,
    remove: (id: string) => void,
}


const useBearStore = create<NoteHeaderZusStore>((set, get) => ({
    notes: List<Notion_Header>(),

    set: (note_header: Notion_Header[]) => {

    },

    add: (note_header: Notion_Header) =>  {

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
    },

    removeAll: () => {
        set( state => ({notes: state.notes.clear()}) );
    }

  }))