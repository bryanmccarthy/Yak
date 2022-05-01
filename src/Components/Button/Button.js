import React from 'react';
import './Button.css';

const Button = (props) => {
    return (
        <button className={props.mode ? "Dark-Button": "Button"} onClick={props.onClick}>{props.text}</button>
    )
}

export default Button;