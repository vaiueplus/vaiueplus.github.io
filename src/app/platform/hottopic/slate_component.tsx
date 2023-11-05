'use client'

import './hottopic.scss';
import {Combine_API, FormatString} from '@/utility/dynamic_utility';
import {API} from '@/api_data';
import React, { useMemo, useEffect, useState } from 'react'
import {Hottopic_Item} from '@/data_structure';
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { useRouter } from 'next/navigation';

export function RenderSlateEditor({item_id} : {item_id: string}) {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const router = useRouter();
    let hotTopicItem : any[] = [];
    const is_readonly = true;

    useEffect(() => {
      let url = FormatString(API.GetHotTopicItem, [item_id]);
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
