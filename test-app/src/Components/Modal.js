import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const Modal = (props) => {

    return (
        <Dialog disableBackdropClick disableEscapeKeyDown open={true} aria-labelledby="form-dialog-title">
            <DialogContent>
                {props.children}
            </DialogContent>
        </Dialog>
    )

}

export default Modal;
