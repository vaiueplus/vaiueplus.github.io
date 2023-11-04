'use client'

import './hottopic.scss';
import {Combine_API, FormatString} from '@/utility/dynamic_utility';
import {API} from '@/api_data';
import React, {  useEffect, useState } from 'react'
import {Hottopic_List} from '@/data_structure';
import Link from 'next/link';

export default function RenderHotTopicItemPage() {
    const [hotTopicList, setHotTopics] = useState<Hottopic_List[]>([]);

    useEffect(() => {
      let url = Combine_API(API.GetHotTopicList);
      console.log(url);
      fetch(url)
      .then(r => r.json())
      .then(data => setHotTopics(data.result));
    },[]);

    return (
	<div>
	{
		hotTopicList.map(hottopic => {

			return (
			<div className="post-board" key={hottopic.database_id}>
				<Link href={"/platform/hottopic/"+hottopic.database_id} className="is-size-6 has-text-weight-semibold">Title: {hottopic.title}</Link>
				<p>Comments: {hottopic.comment_length}</p>
			</div>
			);
		})
	}
	</div>
    )
}

