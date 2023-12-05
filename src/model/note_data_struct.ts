import {v4 as uuidv4} from 'uuid';

export const GetEmptyNotePage = function() {
    let new_block : NotePageType = {
        id: "",
        title: "",
        date: "",
        blocks: [GetEmptyNoteBlock()],//Only prepare header block
        is_new_page : true,
    }
    return new_block;
}

export const GetEmptyNoteBlock = function() {
    let new_block : NoteBlockType = {
        id: "",
        row: [{type: "paragraph", children: [{text: ""}]}],//Only prepare header block
    }
    return new_block;
}

//First Layer
export type NotePageType = {
    id: string,
    title: string,
    date: string,

    blocks : NoteBlockType[],
    is_new_page? : boolean,
}

//Second Layer
export type NoteBlockType = {
    id: string,
    row : NoteRowType[],
    source?: string,
}

export type NoteSource = {
    sources: string[]
}

//Third Layer
export type NoteRowType = {
    type: "image" | "paragraph",
    children: NoteParagraphType[],
    content?: string,
    keyword?: NoteKeywordType[],
}

//Fourth Layer
export type NoteParagraphType = {
    text: string
    color?: string,
    bold?: boolean,
    italic?: boolean,
    keyword?: boolean,
}

export type NoteKeywordType = {
    id: string,
    text: string,

    ref_paragraph: string,
    ref_block: string,
}

export const NoteSourceTexStatic = Object.freeze({
    gpt: "",
    bard: "",
    claude: ""
});

