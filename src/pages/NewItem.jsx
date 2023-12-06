import { useState } from 'react'
import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { useNavigate } from 'react-router-dom';
import { ItemForm } from '../components/ItemForm';

export function NewItem(props) {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [productionDate, setProductionDate] = useState('');
    const [alertDays, setAlertDays] = useState('');

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        let categoriesString = selectedCategories.map((category) => category).join(',');
        let locationsString = selectedLocations.map((location) => location).join(',');

        if (image == '')
            setImage('no_image.png')

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
                    alert_days: alertDays,
                    image: image
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
        </div>
    );
}