import React from 'react';

const Button = (props) => (
    <button
        disabled={props.disabled}
        className="btn btn-dark btn-block"
        onClick={props.clicked}>{props.children}</button>
);

export default Button;