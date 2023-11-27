'use client'

import { BaseEditor, Descendant, Operation, createEditor } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { HistoryEditor, withHistory } from 'slate-history'
import { Notion_Block } from '@/data_structure';
import React, { useCallback, useMemo } from 'react'

export default function RenderSlateContent({placeholder_text, default_data, readOnly }: 
    {placeholder_text: string, default_data: any[], readOnly: boolean}) {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const renderLeaf = useCallback( (props: any) => <Leaf {...props} />, [])

    return (
      <Slate editor={editor} initialValue={default_data} onValueChange={(value) => {
        if (readOnly) return;          
        
        console.log(value);
      }} >

        <Editable readOnly={ readOnly } renderElement={props => <Element {...props} />} renderLeaf={renderLeaf}
                  placeholder={placeholder_text}  />
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