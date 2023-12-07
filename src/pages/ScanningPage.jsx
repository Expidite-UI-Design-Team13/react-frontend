import { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { Box } from "@mui/material";
import axios from "axios";
import { NewItem } from "./NewItem";

export function ScanningPage (props) {
    const [barcode, setBarcode] = useState("Not Found");
    const [error, setError] = useState(null)
    const [item, setItem] = useState(null)

    const fetchProductInfo = async() => {
        axios
        .get(
            `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        )
        .then((response) => {
            const productName = response.data.product.product_name;
            const expirationDate = response.data.product.expiration_date;
            const productImage = response.data.product.image_front_url;
            setItem({ ...item, name: productName, expiration_date: expirationDate, image: productImage});
        })
        .catch((error) => {
            console.error("Error retrieving item:", error);
        });

        // Clear the success message after 5 seconds
        setTimeout(() => {
        }, 5000);
    }

    useEffect(() => {
        
    }, [item])

    if (barcode != "Not Found")
    {
        fetchProductInfo()
        return (
            <NewItem item={item} {...props}/>
        )
    }

    return (
        <div>
            <Header title="Scanning" />
            <NavBar tab="add" />
            <Box sx={{        
                position: 'absolute',
                top: '28%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <BarcodeScannerComponent
                width={350}
                stopStream={barcode != "Not Found"}
                onUpdate={(err, result) => {
                    if (err) setError(err)
                    if (result) setBarcode(result.text);
                    else setBarcode("Not Found");
                }}
                />
            </Box>
        </div>
    )
}