import './hottopic.scss';
import {Combine_API, Combine_Path, FormatString} from '@/utility/static_utility';
import {API} from '@/api_data';
import React from 'react'
import {Notion_Header} from '@/data_structure';
import Link from 'next/link';

export default async function RenderHotTopicItemPage() {

	let hotTopicList : Notion_Header[] = [];
	let url = Combine_API(API.GetHotTopicList);

	console.log(url);

	await fetch(url)
	.then(r => r.json())
	.then(data => hotTopicList = (data.result));

    return (
	<div className="hottopics-container container">
	{
		hotTopicList.map(hottopic => {

			return (
			<div className="post-board-brief-card" key={hottopic.database_id}>
				<Link href={"/platform/hottopic/"+hottopic.database_id} className="is-size-6 has-text-weight-semibold news_feed">{hottopic.title}</Link>
				
				
				<section className="side-action-bar">

					<div className="side-action-item">
						<img src= {Combine_Path("texture/platform/reply.png")} ></img>
						{hottopic.comment_length} Replies
					</div>

					<div className="side-action-item">
						<img src= {Combine_Path("texture/platform/share.png")} ></img>
						Share
					</div>

				</section>
			</div>
			);
		})
	}
	</div>
    )
}

