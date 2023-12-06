import { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';

export function DeleteDialog(props) {
    const handleClose = () => {
        props.setDeleteOpen(false);
    };

    const deleteItem = async () => {
        try {
            const res = await fetch('http://127.0.0.1:5000/api/items/delete', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                },
                body: JSON.stringify({
                    item_id: props.productId,
                })
            })

            const status = await res.status()
            console.log(status)
            handleClose()
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        }
    }

    return(
        <>
            <Dialog
            open={props.deleteOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure you want to delete {props.productName}?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Once deleted you can not retrieve it again.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{color: "#89B0AE"}}>No</Button>
                    <Button onClick={deleteItem} autoFocus sx={{color: "#89B0AE"}}>
                    Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}