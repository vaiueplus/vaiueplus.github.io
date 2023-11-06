import { create } from 'zustand'

type NoteState = {
    id: string,
    content: string,
    timestamp: number,
    title: string,
}

type NoteAction = {
    insert: (note: NoteState) => void

}