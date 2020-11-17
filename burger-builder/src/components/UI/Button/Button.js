import React from 'react';
import classes from './Button.module.css';
const button = (props) => (
  <button
    onClick={props.clicked}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}>
    {props.children}
  </button>
);

export default button;
