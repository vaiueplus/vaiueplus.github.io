import './video_resources.scss';
import React from 'react';

const VideoResourcesPage  = () => {
        return <div>
        <h1 className='title'>Video Resource</h1><br></br>
        <div className='video_content'>

            <div className='video_card'>
                <h2 className='subtitle'><a href="https://www.youtube.com/watch?v=J_3hDqSvpmg" target="_blank" rel="noopener noreferrer">QLoRA is all you need</a></h2>
                <a href="https://www.youtube.com/watch?v=J_3hDqSvpmg" target="_blank" rel="noopener noreferrer"><img src='https://img.youtube.com/vi/J_3hDqSvpmg/default.jpg'></img></a>
                <p>Learning and sharing my process with QLoRA (quantized low rank adapters) fine-tuning. In this case, I use a custom-made reddit dataset, but you can use anything you want.  

                I referenced a LOT of stuff in this video, I will do my best to link everything, but let me know if I forget anything.
                </p>
            </div>

        </div>
	</div>;
}

export default VideoResourcesPage;