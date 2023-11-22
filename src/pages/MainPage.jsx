import React, { useState, useEffect } from 'react';
import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { ItemCard } from '../components/ItemCard';

export function MainPage(props) {
    const [items, setItems] = useState([])

    const fetchInfo = async () => { 
        // TODO: replace user id with authentication user id 
        // need to do user login and signup

        try {
            const res = await fetch(`http://127.0.0.1:5000/api/items/1`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + props.token
                }
            })

            const data = await res.json()
            setItems(data);
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        }   
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    //console.log(items) 

    return (
        <div>
            <Header title="Your Items"/>
            <NavBar tab="home"/>
            {items.map((item) => 
                <ItemCard item={item} key={item.id}/>
            )}
        </div>
    );
}