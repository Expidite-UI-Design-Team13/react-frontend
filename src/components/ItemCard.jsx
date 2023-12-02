import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import '../styles/MainPage.css';

export function ItemCard({ product }) {
    const expirationDate = new Date(product.expiration_date);
    const currentDate = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    const diffDays = Math.round((expirationDate - currentDate) / oneDay);

    const productionDate = new Date(product.production_date);
    const shelfLife =  Math.round(Math.abs((expirationDate - productionDate) / oneDay));

    if (diffDays < 2) {
        return (
            <Card className="item-card-pink" sx={{ width: 170, height: 170, mb: 2, borderRadius: 3, backgroundColor: '#FAF9F9', boxShadow: 4 }}>
                <Typography className="item-title" color="#555B6E" align="center" gutterBottom="true" variant="subtitle1" fontFamily={"'Lato', sans-serif"} component="div">
                    {product.name}
                </Typography>
                <Avatar className="item-avatar-pink" alt={product.name} src={require(`./images/${product.image}`)} sx={{ width: 62, height: 62 }} />
                <CardContent>
                    <LinearProgress variant="determinate" value={100 * (diffDays / shelfLife)} align="center" sx={{
                        backgroundColor: '#D9D9D9',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#FFD6BA'
                        },
                        height: 10,
                        borderRadius: 2,
                    }} />
                    <Typography color="#555B6E" align="center" fontFamily={"'Lato', sans-serif"} sx={{ fontSize: 10 }}>
                        {diffDays < 0 ? (`Expired ${Math.abs(diffDays)} days ago`): (`Expires in ${diffDays} day`)}
                        
                    </Typography>

                    <Stack direction="row" justifyContent="end">
                        <MoreHorizIcon justify="flex-end" sx={{ color: "#FFD6BA" }} />
                    </Stack>
                </CardContent>
            </Card>
        );
    }
    return (
        <Card className="item-card" sx={{ width: 170, height: 170, mb: 2, borderRadius: 3, backgroundColor: '#FAF9F9', boxShadow: 4 }}>
            <Typography className="item-title" color="#555B6E" align="center" gutterBottom="true" variant="subtitle1" fontFamily={"'Lato', sans-serif"} component="div">
                {product.name}
            </Typography>
            <Avatar className="item-avatar" alt={product.name} src={require(`./images/${product.image}`)} sx={{ width: 62, height: 62 }} />
            <CardContent>
                <LinearProgress variant="determinate" value={100 * (diffDays / shelfLife)} align="center" sx={{
                    backgroundColor: '#D9D9D9',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: '#89B0AE'
                    },
                    height: 10,
                    borderRadius: 2,
                }} />
                <Typography color="#555B6E" align="center" fontFamily={"'Lato', sans-serif"} sx={{ fontSize: 10 }}>
                    Expires in {diffDays} days
                </Typography>

                <Stack direction="row" justifyContent="end">
                    <MoreHorizIcon justify="flex-end" sx={{ color: "#BEE3DB" }} />
                </Stack>
            </CardContent>
        </Card>
    );
}