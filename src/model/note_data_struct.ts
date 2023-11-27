
export const GetEmptyNoteBlock = function() {
    let new_block : NoteFullBlock = {
        id: "",
        source: {sources: []},
        blocks: [],            
        is_new_block : true,
    }
    return new_block;
}

export type NoteFullBlock = {
    id: string,
    source: NoteSource,
    blocks : NoteBlockType[],
    
    is_new_block? : boolean,
}

export type NoteSource = {
    sources: string[]
}

//One block is one slate editor
export type NoteBlockType = {
    id: string,
    type: "image" | "paragraph",
    children: NoteParagraphType[],
    
    content?: string,
    keyword?: NoteKeywordType[],
}

export type NoteParagraphType = {
    id: string,
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

