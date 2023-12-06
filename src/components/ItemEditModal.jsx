import { useState } from 'react'
import { ItemForm } from './ItemForm';
import { Modal, Box, Typography, Stack } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

export function ItemEditModal(props) {
    const [name, setName] = useState(props.product.name);
    const [image, setImage] = useState(props.product.image);
    const [expirationDate, setExpirationDate] = useState(props.product.expiration_date);
    const [productionDate, setProductionDate] = useState(props.product.production_date);
    const [alertDays, setAlertDays] = useState(props.product.alert_days);

    const [selectedCategories, setSelectedCategories] = useState(props.product.category.split(","));
    const [selectedLocations, setSelectedLocations] = useState(props.product.location.split(","));

    const handleSubmit = async (e) => {
        e.preventDefault()
        let categoriesString = selectedCategories.map((category) => category).join(',');
        let locationsString = selectedLocations.map((location) => location).join(',');

        if (image == '')
            setImage('no_image.png')

        try {
            const res = await fetch('http://127.0.0.1:5000/api/items/update', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                },
                body: JSON.stringify({
                    user_id: props.id,
                    item_id: props.product.id,
                    name: name,
                    expiration_date: expirationDate,
                    category: categoriesString,
                    location: locationsString,
                    production_date: productionDate,
                    alert_days: alertDays,
                    image: image
                })
            })

            if (res.status == 200)
                props.handleEditClose()
 
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'white',
        maxWidth: '120%',
        p: 4,
      };

    return (
            <Modal
                open={props.editOpen}
                onClose={props.handleEditClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="row" justifyContent="space-between" sx={{marginTop: 2, marginBottom: -5}}>
                        <Typography id="edit-modal-title" variant="h3" component="h1" 
                            sx={{
                                fontSize: '26px',
                                fontFamily: 'Lato, sans-serif',
                                color: '#555B6E'
                            }}>
                            Edit Item
                        </Typography>
                        <ClearRoundedIcon justify="flex-end" onClick={props.handleEditClose}/>
                    </Stack>
                    <ItemForm 
                        name={name}
                        setName={setName} 
                        image={image}
                        setImage={setImage} 
                        expirationDate={expirationDate}
                        setExpirationDate={setExpirationDate} 
                        productionDate={productionDate}
                        setProductionDate={setProductionDate} 
                        alertDays={alertDays}
                        setAlertDays={setAlertDays} 
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories} 
                        selectedLocations={selectedLocations}
                        setSelectedLocations={setSelectedLocations} 
                        handleSubmit={handleSubmit}
                        {...props}
                    />
                </Box>
            </Modal>
    );
}