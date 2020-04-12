import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => (
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div className={classes.Modal}
             style={{display: props.show ? 'flex' : 'none'}}
        >
            <div className={classes.Content}>
                {props.children}
            </div>
        </div>
    </Aux>
);
export default Modal;