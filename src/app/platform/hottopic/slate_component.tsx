'use client'

import './hottopic.scss';
import {Combine_API, Combine_Path, FormatString} from '@/utility/static_utility';
import {API} from '@/api_data';
import React, { useMemo, useEffect, useState } from 'react'
import {Comment_Block, Notion_Block, Notion_Header, Database_Item} from '@/data_structure';
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { useRouter } from 'next/navigation';



export function RenderSlateEditor({item_id} : {item_id: string}) {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const router = useRouter();
    let hotTopicItem : any[] = [];

    const [introCard, setIntroCard] = useState<Notion_Header>({saved_length: 0, comment_length: 0});
    const [comments, setComments] = useState<Comment_Block[]>([]);

    const is_readonly = true;

    useEffect(() => {
      let url = FormatString(API.GetHotTopicItem, [item_id]);
          url = Combine_API(url);

      console.log(url);

      fetch(url)
      .then(r => r.json())
      .then(data => {

        let hot_topics : Database_Item = data.result;
        hotTopicItem = (ParseItemsToSlates(hot_topics.blocks));        
        editor.insertNodes(hotTopicItem);

        setComments(hot_topics.comments);
        setIntroCard(hot_topics.intro)
      });
    },[]);


    return (
      <div className="post-board">

        <div className='slate-editor-header'>
          <button className='button back-btn' onClick={() => router.back()}>Back</button>         
          <p className='slate-editor-title'>{introCard.title}</p>
          <p className='slate-editor-tag'>{introCard.tag}</p>
        </div>

        <div className='slate-editor-container'>
        <Slate  editor={editor} initialValue={hotTopicItem}>
           <Editable readOnly={is_readonly} renderElement={props => <Element {...props} />} placeholder="Enter some plain text..." />
         </Slate>
        </div>


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


function ParseItemsToSlates(blocks: Notion_Block[]) {
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
