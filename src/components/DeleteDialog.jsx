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
        if (props.type=="item") {
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

                if (res.status == 200){
                    handleClose()
                }
            } catch (error) {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            }
        } else if (props.type=="category") {
            try {
                const res = await fetch(`http://127.0.0.1:5000/api/categories/delete`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + props.token
                    },
                    body: JSON.stringify({
                        user_id: props.id,
                        category: props.name
                    })
                })
                if (res.status == 200)
                    handleClose()
            } catch (error) {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            } 
        } else if (props.type=="location") {
            try {
                const res = await fetch(`http://127.0.0.1:5000/api/locations/delete`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + props.token
                    },
                    body: JSON.stringify({
                        user_id: props.id,
                        location: props.name
                    })
                })
                if (res.status == 200)
                    handleClose()
            } catch (error) {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
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
                    Are you sure you want to delete {props.name}?
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