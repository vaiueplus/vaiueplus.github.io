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
export interface Hottopic_List {
    database_id: string,
    comment_length: number,
    title: string,
}

export interface Hottopic_Item {
    blocks: Hottopic_Block[],
}

export interface Hottopic_Block {
    type : string,
    value: string
    color?: string,
    bold?: boolean,
    italic?: boolean,
}
//#endregion