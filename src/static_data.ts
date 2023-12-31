import {UICategoryInterface, UITopicInterface, UISubjectInterface, LearningResourceDictInterface} from './data_structure';
import {Combine_Path} from './utility/static_utility';

export const SUBJECT_LAW_LEARNING = "SUBJECT_LAW_LEARNING";

export const CoockieTable = Object.freeze({
    Procedural_Language_Code : "procedural_language_code",
    UserID : "user_id",
});

export const LocalStorageTable = Object.freeze({
    Account : "account",
});

export const LangCodeTable = Object.freeze({
    Null : "",
    English: "en",
    Mandarin_TW: "zh_tw",
    Mandarin_CN: "zh_cn",
    Korean: "kr"
});

export const EventID = Object.freeze({
    MouseDown : "event@mouse_down",
});

export const NoteSourceIcon = Object.freeze({
    BingAI : "texture/notes/bing-ai-icon.png",
    ChatGPT : "texture/notes/chatgpt-icon.png",
    Claude : "texture/notes/claude-ai-icon.png",
    Bard : "texture/notes/google-bard-icon.png",
});

export const PageIDTable = Object.freeze({
    Law_Learning : "law_learning",
    Law_Learning_Topic: "topic",
    Law_Learning_Collection: "collection",
    Law_Learning_Process: "process",
    Law_Learning_Presentation: "presentation",
    Law_Learning_Conclusion: "conclusion",
});

export const PageDataJSON : UICategoryInterface = {
    SUBJECT_LAW_LEARNING : {

        id: PageIDTable.Law_Learning,
        path: "/platform/procedural",
        title: "Law Learning",
        thumbnail: Combine_Path("texture/icon/law_learning.jpg"),
        description: "For law user to study accelerated",

        topics: [
            {
                id: PageIDTable.Law_Learning_Topic,
                path: "/platform/procedural/topic",
                title : "Topic",
                description : "What is your topic about law?"
            } , 
            {
                id: PageIDTable.Law_Learning_Collection,
                path: "/platform/procedural/data_collection",
                title : "Collection",
                description : "What is your topic about law?"
            },
            {
                id: PageIDTable.Law_Learning_Process,
                path: "/platform/procedural/process",
                title : "Process",
                description : "What is your topic about law?"
            },
            {
                id: PageIDTable.Law_Learning_Presentation,
                path: "/platform/procedural/presentation",
                title : "Presentation",
                description : "What is your topic about law?"
            },
            {
                id: PageIDTable.Law_Learning_Conclusion,
                path: "/platform/procedural/conclusion",
                title : "Conclusion",
                description : "What is your topic about law?"
            },
        ]
    }
}


export const LawLearningJSON : LearningResourceDictInterface = {
    topic : [
        {
            id: "law_learning_chatgpt_01",
            language: "",
            path: "https://chat.openai.com/",
            title: "ChatGPT",
            description: "ChatGPT is an AI-powered language model developed by OpenAI, capable of generating human-like text based on context and past conversations.",
            thumbnail: Combine_Path("texture/icon/chatgpt.jpg"),
            learning_tags: ["chatgpt"]
        },
        {
            id: "law_learning_bard_01",
            language: "",
            path: "https://bard.google.com/chat",
            title: "BARD AI",
            description: "Discover more about Bard, a collaborative AI tool developed by Google and powered by PaLM 2 to help bring your ideas to life.",
            thumbnail: Combine_Path("texture/icon/bard.jpg"),
            learning_tags: ["bard"]
        }
    ],
    process : [
        {
            id: "law_learning_bard_01",
            language: "",
            path: "https://bard.google.com/chat",
            title: "BARD AI",
            description: "Discover more about Bard, a collaborative AI tool developed by Google and powered by PaLM 2 to help bring your ideas to life.",
            thumbnail: Combine_Path("texture/icon/bard.jpg"),
            learning_tags: ["bard"]
        }
    ],
    presentation : [
        {
            id: "law_learning_inflection_01",
            language: "",
            path: "https://inflection.ai/",
            title: "Inflection AI",
            description: "We are an AI studio creating a personal AI for everyone.",
            thumbnail:  Combine_Path("texture/icon/inflection.jpg"),
            learning_tags: ["inflection"]
        }
    ],
    collection : [
        {
            id: "law_learning_chatgpt_01",
            language: "",
            path: "https://chat.openai.com/",
            title: "ChatGPT",
            description: "ChatGPT is an AI-powered language model developed by OpenAI, capable of generating human-like text based on context and past conversations.",
            thumbnail: Combine_Path("texture/icon/chatgpt.jpg"),
            learning_tags: ["chatgpt"]
        }
    ],
    conclusion : [
        {
            id: "law_learning_chatgpt_01",
            language: "",
            path: "https://chat.openai.com/",
            title: "ChatGPT",
            description: "ChatGPT is an AI-powered language model developed by OpenAI, capable of generating human-like text based on context and past conversations.",
            thumbnail: Combine_Path("texture/icon/chatgpt.jpg"),
            learning_tags: ["chatgpt"]
        }
    ]
}

export function GetSubjectComponent(id: string) {
    if (id in PageDataJSON) {
        return PageDataJSON[id];
    }
    return null;
}

export function GetTopicComponent(id: string) {

    for (const [key, value] of Object.entries(PageDataJSON)) {

        for (let t in value.topics) {

            if (value.topics[t].id == id )
                return value.topics[t];
        }
    }

    return null;      
}
