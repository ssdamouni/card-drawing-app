import React from 'react';

const Card  = ({img, suit, value }) => {
    return(
        <div>
            <img src={img} alt={`${value} of ${suit}`}/>
        </div>
    )
}

export default Card;