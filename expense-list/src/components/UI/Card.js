// eslint-disable-next-line no-unused-vars
import react from 'react';
import classes from './card.module.css';

const Card = props=> {
    return <div className={`${classes.card} ${props.className}`}>{props.children} </div>;    
};

export default Card;