import { useState } from 'react'
import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { 
    Button,
    TextField,
    FormControl,
    Box,
    Stack,
    MenuItem,
    Select,
 } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { ButtonDropDown } from '../components/ButtonDropDown';
import { useNavigate } from 'react-router-dom';

export function NewItem(props) {
    const [name, setName] = useState('');
    const [picture, setPicture] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [productionDate, setProductionDate] = useState('');
    const [alertDays, setAlertDays] = useState('');

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);

    //const [alertDaysOptions, setAlertDaysOptions] = useState([])

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        let categoriesString = selectedCategories.map((category) => category).join(',');
        let locationsString = selectedLocations.map((location) => location).join(',');

        try {
            const res = await fetch('http://127.0.0.1:5000/api/items/add', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                },
                body: JSON.stringify({
                    user_id: props.id,
                    name: name,
                    expiration_date: expirationDate,
                    category: categoriesString,
                    location: locationsString,
                    production_date: productionDate,
                    alert_days: alertDays
                })
            })

            const data = await res.json()
            //console.log(data.access_token)
            navigate("/");
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
            <Header title="New Item" />
            <NavBar tab="add" />
            <div>
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 2, paddingLeft: '15px', paddingRight: '15px', fontFamily: "'Lato', sans-serif", fontSize: '18px' }}>
                    <Box sx={{ padding: '15px', paddingTop: "0px", border: 3, borderColor: "#BEE3DB", borderRadius: 2, boxShadow: 5, backgroundColor: "#FAF9F9" }}>
                        <Stack direction="row" spacing={2} sx={{paddingTop: '10px', paddingBottom: '10px'}}>
                            <Box sx={{fontSize: '18px', color: '#2A2E38', paddingTop: "6px"}}>Name:</Box>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={name}
                                size='small'
                                onChange={e => setName(e.target.value)}
                            />
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
                            <Box sx={{fontSize: '18px', color: '#2A2E38'}}>Picture:</Box>
                            <Box sx={{backgroundColor: "#D9D9D9", width: '97px', height: '125px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <AddIcon fontSize='large'/>
                            </Box>
                        </Stack>
                        <FormControl>
                            <Stack direction="row" spacing={1.5} alignItems="center" sx={{paddingTop: '10px', paddingBottom: '10px'}}>
                                <Box sx={{fontSize: '18px', color: '#2A2E38'}}>Category:</Box>
                                <Box>
                                    <ButtonDropDown
                                        items={["food", "medicine", "skincare"]}
                                        selectedItems={selectedCategories}
                                        setSelectedItems={setSelectedCategories}
                                    />
                                </Box>
                            </Stack>
                        </FormControl>
                        <br/>
                        <FormControl>
                            <Stack direction="row" spacing={1.5} alignItems="center" sx={{paddingTop: '10px', paddingBottom: '10px'}}>
                                <Box sx={{fontSize: '18px', color: '#2A2E38'}}>Location:</Box>
                                <Box>
                                    <ButtonDropDown
                                        items={["kitchen", "bathroom", "pantry"]}
                                        selectedItems={selectedLocations}
                                        setSelectedItems={setSelectedLocations}
                                    />
                                </Box>
                            </Stack>
                        </FormControl>
                    </Box>
                    <Box sx={{ padding: '15px', paddingTop: "0px", marginTop: "20px", border: 3, borderColor: "#BEE3DB", borderRadius: 2, boxShadow: 5, backgroundColor: "#FAF9F9" }}>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
                            <Box sx={{fontSize: '18px', color: '#2A2E38'}}>Expiration Date:</Box>
                            <TextField
                                type="date"
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{backgroundColor: "#BEE3DB"}}
                                size="small"
                            />
                        </Stack>
                        <Stack direction="row" spacing={1.6} alignItems="center" sx={{ mt: 1 }}>
                            <Box sx={{fontSize: '18px', color: '#2A2E38'}}>Production Date:</Box>
                            <TextField
                                type="date"
                                value={productionDate}
                                onChange={(e) => setProductionDate(e.target.value)}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{backgroundColor: "#BEE3DB"}}
                                size="small"
                            />
                        </Stack>
                        <FormControl fullWidth>
                            <Stack direction="row" spacing={1} alignItems="top" sx={{ mt: 1 }}>
                                <Box sx={{color: '#2A2E38'}}>Alert me</Box>
                                <Select
                                    value={alertDays}
                                    onChange={e => setAlertDays(e.target.value)}
                                    sx={{height: '25px'}}
                                >
                                    {Array.apply(null, { length: 30 }).map((e, i) => (
                                        <MenuItem key={1+1} value={i+1}>{i+1} days</MenuItem>
                                    ))}
                                </Select>
                                <Box sx={{color: '#2A2E38'}}>before expiration</Box>
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
        </div>
    );
}