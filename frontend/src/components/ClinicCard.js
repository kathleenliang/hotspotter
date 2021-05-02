import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleUp, faArrowCircleDown } from '@fortawesome/fontawesome-free-solid'

const ClinicCard = props => {
    return (
        <div>
            <div class="clinic-card">
                <div style={{padding: '20px'}}>
                    <div style={{fontFamily: 'Futura', fontSize: '21px', lineHeight: '28px'}}>{props.name}</div>
                    <div style={{fontFamily: 'Open Sans', fontSize: '18px', lineHeight: '25px'}}>{props.address}</div>
                    <div style={{fontFamily: 'Open Sans', fontSize: '18px', lineHeight: '25px'}}>{props.hours} | {props.phone}</div>
                    <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '10px'}}>
                        <div style={{fontFamily: 'Open Sans', fontSize: '16px', lineHeight: '22px', color: '#8A99A8'}}>
                        <FontAwesomeIcon icon={faArrowCircleUp} style={{paddingRight: '10px'}} /> {props.likes} upvotes
                        </div>
                        <div style={{fontFamily: 'Open Sans', fontSize: '16px', lineHeight: '22px', color: '#8A99A8'}}>
                            <FontAwesomeIcon icon={faArrowCircleDown} style={{paddingRight: '10px'}} />{props.dislikes} downvotes
                        </div>
                        <div style={{fontFamily: 'Open Sans', fontSize: '16px', lineHeight: '22px', color: '#8A99A8'}}>From {props.submitted_from}</div>
                        <div style={{fontFamily: 'Open Sans', fontSize: '16px', lineHeight: '22px', color: '#EE5049'}}>More info &#10132;</div>
                    </div>                
                </div>
            </div>
        </div>
    );
};

export default ClinicCard;