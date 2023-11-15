export interface UICategoryInterface {
    [subject: string]: UISubjectInterface;
}

export interface UISubjectInterface extends UITopicInterface{
    topics: UITopicInterface[],
}

export interface UITopicInterface {
    id: string,
    path: string,
    title: string,
    description: string,
    thumbnail?: string,
}

export interface LearningResourceDictInterface {
    [subject: string]: LearningResourceInterface[];
}

export interface LearningResourceInterface {
    id: string,
    language: "en" | "cn" | "kr" | "",
    path: string,
    title: string,
    description: string,
    thumbnail: string,
    learning_tags: string[]
}

//#region Hot Topic
export interface Notion_Header {
    database_id?: string,
    title?: string,
    last_edited_time: string,

    tag?: string,
    comment_length?: number,
    saved_length?: number,
}

export interface Database_Item {
    blocks: Notion_Block[],
    intro: Notion_Header,
    comments: Comment_Block[],
}

export interface Notion_Block {
    id: string,
    type : string,
    value: string
    color?: string,
    bold?: boolean,
    italic?: boolean,
}

export interface Comment_Block {
    id : string,
    value: string,
    owner_name: string,
}
//#endregion