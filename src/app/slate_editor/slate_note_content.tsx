'use client'

import { BaseEditor, Descendant, Operation, createEditor } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { HistoryEditor, withHistory } from 'slate-history'
import { Notion_Block } from '@/data_structure';
import React, { Fragment, useCallback, useMemo } from 'react'

export default function RenderSlateContent({index, id, placeholder_text, default_data, readOnly, finish_edit_event, action_bar_event }: 
    {index: number, id: string, placeholder_text: string, default_data: any[], readOnly: boolean, 
      finish_edit_event: (id: string, value: Descendant[]) => void, action_bar_event: (id: string) => void }) {

    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const renderLeaf = useCallback( (props: any) => <Leaf {...props} />, [])
    let value_change_flag = false;
    let descendents : Descendant[] = [];

    let render_addon_btn = function(i: number) {
      if (i <= 0) return <Fragment></Fragment>;
      
      return <button className='note-block-btn' onClick={() => action_bar_event(id)}>+</button>;
    }

    return (
      <Slate editor={editor}  initialValue={default_data}
      
      onValueChange={(value) => {
        if (readOnly) return;       

        descendents = value;
        value_change_flag = true;
      }} >

        <Editable readOnly={ readOnly } renderElement={props => <Element {...props} />} renderLeaf={renderLeaf}
			onBlur={() => {
				if (value_change_flag) {
					value_change_flag = false;
					finish_edit_event(id, descendents);
				}
			}
    }

          placeholder={placeholder_text}  />
          {render_addon_btn(index)}
      </Slate>
    );
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
      <div>
        <img
          src={element.url}
        />
      </div>
    </div>
  )
}

export function ParseItemsToSlates(blocks: Notion_Block[]) {
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
            key: block.id,
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

  export function SlateToBlock(nodes: Descendant[]) {
    let n = nodes.length;
    let blocks : Notion_Block[] = [];

    for (let i = 0; i < n; i++) {
      let node : any = nodes[i];

      if (node["type"] == "paragraph" && node["children"].length > 0) {
        blocks.push({
          id: "",
          type : "paragraph",
          value: node["children"][0]["text"]
        });
      }
    }

    return blocks;
  }

  const Leaf = ({ attributes, children, leaf } : {attributes: any, children: any, leaf:any}) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>
    }
  
    if (leaf.code) {
      children = <code>{children}</code>
    }
  
    if (leaf.italic) {
      children = <em>{children}</em>
    }
  
    if (leaf.underline) {
      children = <u>{children}</u>
    }
  
    return <span {...attributes}>{children}</span>
  }