import React, { useState, useEffect } from 'react';
import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { ItemCard } from '../components/ItemCard';

export function MainPage() {
    const [items, setItems] = useState([])

    const fetchInfo = async () => { 
        // TODO: replace user id with authentication user id 
        // need to do user login and signup
        const res = await fetch(`http://127.0.0.1:5000/api/items/1`);
        const data = await res.json();
        setItems(data);
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
                <ItemCard item={item} />
            )}
        </div>
    );
}