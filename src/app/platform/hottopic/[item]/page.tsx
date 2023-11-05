import '../hottopic.scss';
import {Combine_API} from '@/utility/dynamic_utility';
import {API} from '@/api_data';
import React from 'react'
import {RenderSlateEditor} from '../slate_component';

export async function generateStaticParams() {
  const posts = await fetch(Combine_API(API.GetHotTopicList)).then((res) => res.json())

  return posts["result"].map((x: any) => ({
    item: x["database_id"],
  }))
}

export default function Page({ params }: { params: { item: string } }) {
    return (
      <div>
        <RenderSlateEditor item_id={params.item}></RenderSlateEditor>
      </div>
    )
}