import { useState } from "react";
import { 
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Stack
} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 190,
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export function NewLocationModal(props) {
    const [newLocation, setNewLocation] = useState("")

    const handleSubmitNewLocation = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:5000/api/locations/add`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                },
                body: JSON.stringify({
                    user_id: props.id,
                    location: newLocation
                })
            })
            const data = await res.json()
            console.log(data)
            props.onLocationClose()
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        } 
    }

    return (
        <div>
            <Modal
                open={props.locationModalOpen}
                onClose={props.onLocationClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        New Location
                    </Typography>
                    <Box id="modal-modal-description" sx={{ mt: 2 }}>
                        <form>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={newLocation}
                                size='small'
                                onChange={e => setNewLocation(e.target.value)}
                            />
                            <Stack direction="row">
                            <Button 
                                onClick={props.onLocationClose} 
                                sx={{
                                    height: '30px', 
                                    width: '70px',
                                    mt: 2, 
                                    mb: 2, 
                                    ml: 17,
                                    backgroundColor: "white", 
                                    borderColor:  "#9FDDCF",
                                    color: "black",
                                    fontSize: "16px", 
                                    textTransform: 'none'
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" 
                                onClick={handleSubmitNewLocation}
                                sx={{
                                    height: '30px', 
                                    width: '70px',
                                    mt: 2, 
                                    mb: 2, 
                                    ml: 1, 
                                    backgroundColor: "#9FDDCF", 
                                    color: "#2A2E38", 
                                    fontSize: "16px", 
                                    textTransform: 'none'
                                }}
                            >
                                Add
                            </Button>
                            </Stack>
                        </form>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}