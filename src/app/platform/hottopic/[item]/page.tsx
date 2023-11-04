'use client'

import '../hottopic.scss';
import {Combine_API, FormatString} from '@/utility/dynamic_utility';
import {API} from '@/api_data';
import React, { useMemo, useEffect, useState } from 'react'
import {Hottopic_Item, Hottopic_List} from '@/data_structure';
import { createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact, useSlateStatic, ReactEditor, useSelected, useFocused } from 'slate-react'
import { withHistory } from 'slate-history'
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export async function generateStaticParams() {
  const posts = await fetch(Combine_API(API.GetHotTopicList)).then((res) => res.json())
  console.log(posts);

  return posts["result"].map((x: any) => ({
    item: x["database_id"],
  }))
}

export default function Page({ params }: { params: { item: string } }) {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const router = useRouter();

    const is_readonly = true;

    let hotTopicItem : any[] = [];
    
    useEffect(() => {
      let url = FormatString(API.GetHotTopicItem, [params.item]);
          url = Combine_API(url);

      console.log(url);

      fetch(url)
      .then(r => r.json())
      .then(data => {
        hotTopicItem = (ParseItemsToSlates(data.result));        
        editor.insertNodes(hotTopicItem);
      });
    },[]);

    return (
      <div className="post-board">

        <button className='button back-btn' onClick={() => router.back()}>Back</button>

        <Slate editor={editor} initialValue={hotTopicItem}>
          <Editable readOnly={is_readonly} renderElement={props => <Element {...props} />} placeholder="Enter some plain text..." />
        </Slate>
      </div>

    )
}

const Element = (props : any)=> {
  const { attributes, children, element } = props

  switch (element.type) {
    case 'image':
      return <Image {...props} />
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Image = ({ attributes, children, element } : any) => {

  return (
    <div {...attributes}>
      {children}
      <div
        contentEditable={false}
      >
        <img
          src={element.url}
        />
      </div>
    </div>
  )
}


function ParseItemsToSlates(item: Hottopic_Item) {
  if (item.blocks == null || item.blocks.length <= 0) {
    return [
      {
        type: 'paragraph',
        children: [
          { text: 'Sorry no conent here'},
        ],
      }];
  }
  let slate_blocks : any[] = [];
  let block_length = item.blocks.length;

  for (let i = 0; i < block_length; i++) {
    let block = item.blocks[i];

    if (block.type == "paragraph") {
      slate_blocks.push(
        {
          type: 'paragraph',
          children: [
            { text: block.value },
          ],
        }
      );
    } if (block.type == "image") {

      slate_blocks.push(
        {
          type: 'image',
          url: block.value,
          children: [{ text: '' }],
        }
      );  
    }
  }
  
  return slate_blocks;
}
