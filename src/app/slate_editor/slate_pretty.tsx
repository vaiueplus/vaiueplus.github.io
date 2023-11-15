'use client'

import { BaseEditor, Descendant, Operation, createEditor } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { HistoryEditor, withHistory } from 'slate-history'
import { Notion_Block } from '@/data_structure';
import React from 'react'

export default function RenderSlatePretty({ editor, default_data, readOnly, onChangeCallback }:
        { editor: BaseEditor & HistoryEditor & ReactEditor, default_data: any[], readOnly: boolean, onChangeCallback: ((x : Descendant[]) => void) | null }) {

    return (
      <Slate editor={editor} initialValue={default_data} onValueChange={(value) => {
        if (readOnly) return;          
        
        const ops = editor.operations

        
        console.log(value);
        onChangeCallback?.(value);
      }} >
        <Editable readOnly={ readOnly } renderElement={props => <Element {...props} />} placeholder="Enter some plain text..."
        />
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