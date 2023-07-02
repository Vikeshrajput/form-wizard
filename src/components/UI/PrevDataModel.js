import React from "react";
import ReactDOM from "react-dom";

import classes from "./PrevDataModel.module.css";

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onConfirm}></div>;
};
const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={classes.content}>
                <p>{props.massege}</p>
            </div>
            <footer className={classes.actions}>
                <button
                        className={classes.button}
                        type="button"
                        onClick={props.onCancel}
                >Cancel</button>
                <button
                    className={classes.button}
                    type="button"
                    onClick={props.onConfirm}
                >Confirm</button>
            </footer>
        </div>
    );
};

const PrevDataModel = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(<ModalOverlay title={props.title} massege={props.massege} onConfirm={props.onConfirm} onCancel={props.onCancel} />,
                document.getElementById('overlay-root')
            )}
        </React.Fragment>
    );
};

export default PrevDataModel;
