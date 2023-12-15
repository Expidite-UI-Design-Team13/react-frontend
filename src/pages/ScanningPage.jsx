import { useState, useEffect, useRef } from "react";
import { NavBar } from "../components/NavBar";
import { Header } from "../components/Header";
import { Box } from "@mui/material";
import axios from "axios";
import { NewItem } from "./NewItem";
import Scanner from '../components/Scanner'
import Result from '../components/Result';

export function ScanningPage (props) {
    const [barcode, setBarcode] = useState("Not Found");
    const [item, setItem] = useState(null)

    const [results, setResults] = useState([]);
    const scannerRef = useRef(null);

    console.log(barcode)

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
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>


<div>
      <ul className="results">
        {results.map((result) => (result.codeResult && <Result key={result.codeResult.code} result={result} />))}
      </ul>
      <div ref={scannerRef} style={{ position: 'relative', border: '3px solid #FFAF78' }}>
        {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
        <canvas className="drawingBuffer" style={{
          position: 'absolute',
          top: '0px',
          // left: '0px',
          // height: '100%',
          // width: '100%',
          border: '3px solid #BEE3DB',
        }} width="640" height="480" />
        <Scanner setBarcode={setBarcode} scannerRef={scannerRef} onDetected={(result) => setResults([...results, result])} />
      </div>
    </div>

            </Box>
        </div>
    )
}