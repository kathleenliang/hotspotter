import React from 'react';
import { Link } from "react-router-dom";

const ContentCard = props => {

    return (
        <div>
            <div class="content-card">
                <div class="cc-img"><img src="/Logo.png" /></div>
                <div class="cc-title">{props.title}</div>
                <div class="cc-subtitle">{props.subtitle}</div>
                <div class="cc-action"><Link to={props.link} class="cc-link">{props.action} &#10132;</Link></div>
            </div>
        </div>
    );
};

export default ContentCard;