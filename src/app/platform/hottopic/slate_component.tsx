'use client'

import './hottopic.scss';
import {Combine_API, Combine_Path, FormatString} from '@/utility/dynamic_utility';
import {API} from '@/api_data';
import React, { useMemo, useEffect, useState } from 'react'
import {Comment_Block, Hottopic_Block, Hottopic_Item, Hottopic_List} from '@/data_structure';
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { useRouter } from 'next/navigation';



export function RenderSlateEditor({item_id} : {item_id: string}) {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const router = useRouter();
    let hotTopicItem : any[] = [];
    const [comments, setComments] = useState<Comment_Block[]>([]);

    const is_readonly = true;

    useEffect(() => {
      let url = FormatString(API.GetHotTopicItem, [item_id]);
          url = Combine_API(url);

      console.log(url);

      fetch(url)
      .then(r => r.json())
      .then(data => {

        let hot_topics : Hottopic_Item = data.result;
        hotTopicItem = (ParseItemsToSlates(hot_topics.blocks));        
        editor.insertNodes(hotTopicItem);

        setComments(hot_topics.comments);
      });
    },[]);


    return (
      <div className="post-board">
        <button className='button back-btn' onClick={() => router.back()}>Back</button> 

         <Slate editor={editor} initialValue={hotTopicItem}>
           <Editable readOnly={is_readonly} renderElement={props => <Element {...props} />} placeholder="Enter some plain text..." />
         </Slate>

        {
          
         comments.map(x=> {
          return (
            <div className='post-board-comment' key={x.id}>
              <img src= {Combine_Path("texture/platform/avatar_default.png")} ></img>
              <p>{x.value}</p>
            </div> 
          )
         })
        }

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


function ParseItemsToSlates(blocks: Hottopic_Block[]) {
  if (blocks == null || blocks.length <= 0) {
    return [
      {
        type: 'paragraph',
        children: [
          { text: 'Sorry no conent here'},
        ],
      }];
  }
  let slate_blocks : any[] = [];
  let block_length = blocks.length;

  for (let i = 0; i < block_length; i++) {
    let block = blocks[i];

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
