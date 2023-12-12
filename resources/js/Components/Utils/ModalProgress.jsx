import React from 'react'
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import LinearProgress from '@mui/joy/LinearProgress';

const ModalProgress = (props) => {
    return (
        <div>
            <Modal open={props.show}
                aria-labelledby="modal-title"
                aria-describedby="modal-desc" 
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalDialog>
                    <LinearProgress />
                </ModalDialog>
            </Modal>
        </div>
    )
}

export default ModalProgress
