'use client'
import React from 'react';
import './tools_review.scss';
import {ReviewCard, ReviewCardProps} from './review_card';

const ToolsReviewPage  = async () => {
    let review_raw_data = await fetch("https://dummyjson.com/products");
    let review_json : ReviewCardProps[] = (await review_raw_data.json())["products"];
    let review_count = review_json.length;

    const cards_dom_list = [];
    for (let i = 0; i < review_count; i++) {
        cards_dom_list.push(<ReviewCard  card_prop={review_json[i]} />);
    }

    return <div>
        <h1 className='title'>Tools Review</h1><br></br>

        <div className="reviews_content">
            {cards_dom_list}
        </div>

    </div>;
}

export default ToolsReviewPage;