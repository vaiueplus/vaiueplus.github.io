import React from 'react';
import './tools_review.scss';
import {RenderNotePage} from './note_component';
import {RenderPreviewPage} from './preview_component';

const ToolsNotePage  = async () => {


    
    return <div className='tool-note-page'>

    <div className="columns is-desktop">
        <div className="column">
            <RenderNotePage></RenderNotePage>
        </div>

        <div className="column">
            <RenderPreviewPage></RenderPreviewPage>
        </div>
    </div>
</div>;
}

export default ToolsNotePage;