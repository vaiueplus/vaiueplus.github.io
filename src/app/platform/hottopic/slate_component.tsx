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
import RenderSlatePretty, {ParseItemsToSlates} from '@/app/slate_editor/slate_pretty';

export function RenderSlateEditor({item_id} : {item_id: string}) {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const router = useRouter();
    let hotTopicItem : any[] = [];

    const [introCard, setIntroCard] = useState<Notion_Header>({last_edited_time: "", saved_length: 0, comment_length: 0});
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
          <RenderSlatePretty editor={editor} default_data={hotTopicItem} readOnly={is_readonly} onChangeCallback={null}></RenderSlatePretty>
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

