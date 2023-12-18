import { useState, useRef, useEffect } from "react";
import {
    Button,
    TextField,
    FormControl,
    Box,
    Stack,
    MenuItem,
    Select,
    IconButton,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { ButtonDropDown } from './ButtonDropDown';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';


export function ItemForm(props) {
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);


    const fileInput = useRef();

    const fetchOptions = async () => {
        // TODO: replace user id with authentication user id 
        // need to do user login and signup
        try {
            const categoriesRes = await fetch(`http://127.0.0.1:5000/api/categories`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                },
                body: JSON.stringify({
                    user_id: props.id
                })
            })
            const categoriesData = await categoriesRes.json()
            const categoriesArray = []

            for (let i = 0; i < categoriesData.length; i++)
                categoriesArray.push(categoriesData[i]["category"])

            setCategories(categoriesArray);
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        }

        try {
            const locationsRes = await fetch(`http://127.0.0.1:5000/api/locations`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                },
                body: JSON.stringify({
                    user_id: props.id
                })
            })
            const locationsData = await locationsRes.json()
            const locationsArray = []

            for (let i = 0; i < locationsData.length; i++)
                locationsArray.push(locationsData[i]["location"])

            setLocations(locationsArray);
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        }
    }

    const handleAddCategory = () => {
        props.setCategoryModalOpen(true)
    }

    const handleAddLocation = () => {
        props.setLocationModalOpen(true)
    }

    useEffect(() => {
        fetchOptions();
    }, [fetchOptions])

    return (
        <div>
            <Box component="form" noValidate autoComplete="off" onSubmit={props.handleSubmit} sx={{ mt: 2, paddingLeft: '15px', paddingRight: '15px', paddingTop: 9, paddingBottom: 0.7, fontFamily: "'Lato', sans-serif", fontSize: '18px' }}>
                <Box sx={{ padding: '15px', paddingTop: "0px", border: 3, borderColor: "#BEE3DB", borderRadius: 2, boxShadow: 5, backgroundColor: "#FAF9F9" }}>
                    <Stack direction="row" spacing={2} sx={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <Box sx={{ fontSize: '18px', color: '#2A2E38', paddingTop: "6px" }}>Name:</Box>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={props.name}
                            size='small'
                            onChange={(e) => {
                                props.setName(e.target.value)
                                localStorage.setItem('itemName', e.target.value)
                            }}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="top" sx={{ mt: 0 }}>
                        <Box sx={{ fontSize: '18px', color: '#2A2E38' }}>Picture:</Box>
                        {props.image === '' || props.image === null ? (
                            <IconButton onClick={() => {
                                fileInput.current.click();
                            }}>
                                <Box sx={{ backgroundColor: "#D9D9D9", width: '97px', height: '125px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <AddIcon fontSize='large' />
                                </Box>
                            </IconButton>
                        ) :
                            (
                                <Box sx={{ backgroundColor: "white", width: '97px', height: '125px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                    <HighlightOffRoundedIcon
                                        sx={{ color: '#555B6E', fontSize: '16px', position: 'absolute', marginLeft: 12, marginBottom: 15.5 }}
                                        onClick={() => {props.setImage('')
                                            localStorage.removeItem('itemImage')
                                        }}
                                    />
                                    {props.image && props.image.startsWith("http") ? (
                                        <img src={props.image} width='97px' />
                                    ) : (
                                        <img src={require(`../components/images/${props.image}`)} width='97px' />
                                    )}
                                </Box>
                            )}
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            ref={fileInput}
                            onChange={() => {
                                props.setImage(fileInput.current.files[0].name)
                                localStorage.setItem('itemImage', fileInput.current.files[0].name)
                            }}
                        />
                    </Stack>
                    <FormControl>
                        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <Box sx={{ fontSize: '18px', color: '#2A2E38' }}>Category:</Box>
                            <Box>
                                <ButtonDropDown
                                    items={categories}
                                    selectedItems={props.selectedCategories}
                                    setSelectedItems={props.setSelectedCategories}
                                    type="category"
                                    handleAdd={handleAddCategory}
                                    id={props.id}
                                    token={props.token}
                                />
                            </Box>
                        </Stack>
                    </FormControl>
                    <br />
                    <FormControl>
                        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <Box sx={{ fontSize: '18px', color: '#2A2E38' }}>Location:</Box>
                            <Box>
                                <ButtonDropDown
                                    items={locations}
                                    selectedItems={props.selectedLocations}
                                    setSelectedItems={props.setSelectedLocations}
                                    type="location"
                                    handleAdd={handleAddLocation}
                                    id={props.id}
                                    token={props.token}
                                />
                            </Box>
                        </Stack>
                    </FormControl>
                </Box>
                <Box sx={{ padding: '15px', paddingTop: "0px", marginTop: "20px", border: 3, borderColor: "#BEE3DB", borderRadius: 2, boxShadow: 5, backgroundColor: "#FAF9F9" }}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
                        <Box sx={{ fontSize: '18px', color: '#2A2E38' }}>Expiration Date:</Box>
                        <TextField
                            type="date"
                            value={props.expirationDate}
                            onChange={(e) => props.setExpirationDate(e.target.value)}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{ backgroundColor: "#BEE3DB" }}
                            size="small"
                        />
                    </Stack>
                    <Stack direction="row" spacing={1.6} alignItems="center" sx={{ mt: 1 }}>
                        <Box sx={{ fontSize: '18px', color: '#2A2E38' }}>Production Date:</Box>
                        <TextField
                            type="date"
                            value={props.productionDate}
                            onChange={(e) => props.setProductionDate(e.target.value)}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{ backgroundColor: "#BEE3DB" }}
                            size="small"
                        />
                    </Stack>
                    <FormControl fullWidth>
                        <Stack direction="row" spacing={1} alignItems="top" sx={{ mt: 1 }}>
                            <Box sx={{ color: '#2A2E38' }}>Alert me</Box>
                            <Select
                                value={props.alertDays}
                                onChange={e => props.setAlertDays(e.target.value)}
                                sx={{ height: '25px' }}
                            >
                                {Array.apply(null, { length: 30 }).map((e, i) => (
                                    <MenuItem key={1 + 1} value={i + 1}>{i + 1} days</MenuItem>
                                ))}
                            </Select>
                            <Box sx={{ color: '#2A2E38' }}>before expiration</Box>
                        </Stack>
                    </FormControl>
                </Box>
                <Box textAlign='center'>
                    <Button type="submit" fullWidth variant="contained" sx={{ height: '45px', width: '300px', mt: 11, mb: 2, backgroundColor: "#9FDDCF", color: "#2A2E38", fontSize: "20px", textTransform: 'none' }}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </div>
    )
}