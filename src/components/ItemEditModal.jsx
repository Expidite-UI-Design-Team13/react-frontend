import { useState } from 'react'
import { ItemForm } from './ItemForm';
import { Modal, Box } from '@mui/material';
import { Header } from './Header';
import { NavBar } from './NavBar';

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

    return (
        <Box>
            <Modal
                open={props.editOpen}
                onClose={props.handleEditClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box style={{backgroundColor: "white", height: '100%'}}>
                <Header title="Edit Item" {...props} />
                <NavBar tab="home" />
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
        </Box>
    );
}