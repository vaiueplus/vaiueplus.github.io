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