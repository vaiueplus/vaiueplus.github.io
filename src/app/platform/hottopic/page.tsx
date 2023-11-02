'use client'
import './hottopic.scss';
import React, { useMemo } from 'react'
import { createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'

export default function RenderHotTopicPage() {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    const is_readonly = true;

    return (
        <div className="post-board">
        <h2 className="news_feed">Title: Stay connected to the upcoming & Recent jobs</h2>
        <Slate editor={editor} initialValue={initialValue}>
            <Editable readOnly={is_readonly} placeholder="Enter some plain text..." />
        </Slate>
        </div>
    )
}

const initialValue: any[] = [
    {
      type: 'paragraph',
      children: [
        { text: 'This is editable plain text, just like a <textarea>!' },
      ],
    },
  ]