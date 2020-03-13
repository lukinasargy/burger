import React from 'react';
import classes from './Modal.module.css';

const Modal = (props) => (
    <div
        className={classes.Modal}
        style={{
            display: props.show? 'flex':'none'
    }}
    >
        <div className={classes.Content}>
            {props.children}
        </div>
    </div>
);
export default Modal;