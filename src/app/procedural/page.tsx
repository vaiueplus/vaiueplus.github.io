import {ShareSubjectComponent, ShareTopicComponent} from "./ShareComponents";
import {PageDataJSON, GetSubjectComponent, SUBJECT_LAW_LEARNING} from '../../static_data';

export default function DrawLawLearningPage() {
    const cards_dom_list = [];
    const page_data = GetSubjectComponent(SUBJECT_LAW_LEARNING);

    if (page_data == null) return (<div>Thing look wrong</div>);

    const page_data_lens = (page_data?.topics == undefined) ? 0 : page_data.topics.length;

    if (page_data != null && page_data.topics != null) {
        for (let i = 0; i < page_data_lens; i++) {
            cards_dom_list.push(<ShareTopicComponent is_link={true} topic_interface={page_data.topics[i]}></ShareTopicComponent> );
        }        
    }

    return (
        <div>
            <ShareSubjectComponent topic_interface={page_data}></ShareSubjectComponent>

            <section>
                {cards_dom_list}
            </section>
        </div>
    );
}