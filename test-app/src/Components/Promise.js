import React from 'react';
import Modal from './Modal';
import { usePromiseTracker } from "react-promise-tracker";
import CircularProgress from '@material-ui/core/CircularProgress';

const PromiseSpinner = () => {

    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress &&
        <Modal>
            {{ flag: true }}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
                <br />
                <label>Now Loading...</label>
            </div>
        </Modal>

    )

}

export default PromiseSpinner;
