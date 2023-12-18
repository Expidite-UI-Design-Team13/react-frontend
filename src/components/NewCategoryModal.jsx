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

export function NewCategoryModal(props) {
    const [newCategory, setNewCategory] = useState("")

    const handleSubmitNewCategory = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:5000/api/categories/add`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                },
                body: JSON.stringify({
                    user_id: props.id,
                    category: newCategory
                })
            })
            const data = await res.json()
            console.log(data)
            props.setSelectedCategories([newCategory])
            props.onCategoryClose()
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
                open={props.categoryModalOpen}
                onClose={props.onCategoryClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        New Category
                    </Typography>
                    <Box id="modal-modal-description" sx={{ mt: 2 }}>
                        <form>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={newCategory}
                                size='small'
                                onChange={e => setNewCategory(e.target.value)}
                            />
                            <Stack direction="row">
                            <Button 
                                onClick={props.onCategoryClose} 
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
                                onClick={handleSubmitNewCategory}
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