import React from 'react';
import './tools_review.scss';
import {RenderNotePage} from './note_component';

const ToolsNotePage  = async () => {
    return <div className='tool-note-page'>

    <div className="columns is-desktop">
        <div className="column">
            <RenderNotePage></RenderNotePage>
        </div>

        <div className="column">
            Second column
        </div>
    </div>
</div>;
}

export default ToolsNotePage;