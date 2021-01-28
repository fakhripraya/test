import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const Modal = (props) => {

    return (
        <Dialog disableBackdropClick disableEscapeKeyDown open={props.children[0].flag} aria-labelledby="form-dialog-title">
            <DialogContent>
                {props.children[1]}
            </DialogContent>
        </Dialog>
    )

}

export default Modal;
