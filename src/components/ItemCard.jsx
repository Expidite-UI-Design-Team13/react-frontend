import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import '../styles/ItemCard.css';
import img from '../images/milk.png';
import LinearProgress from '@mui/material/LinearProgress';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export function ItemCard({ product }) {
    return (
        <Card className="item-card" sx={{ width: 170, height: 170, mb: 2, borderRadius: 3, backgroundColor: '#FAF9F9', boxShadow: 5 }}>
            <Typography className="item-title" color="#555B6E" align="center" gutterBottom="true" variant="subtitle1" fontFamily={"'Lato', sans-serif"} component="div">
                {product.name}
            </Typography>
            <Avatar className="item-avatar" alt={product.name} src={img} sx={{ width: 62, height: 62 }} />
            <CardContent>
                <LinearProgress variant="determinate" value={50} align="center" sx={{
                    backgroundColor: '#D9D9D9',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: '#89B0AE'
                    },
                    height: 10,
                    borderRadius: 2,
                }} />
                <Typography color="#555B6E" align="center" fontFamily={"'Lato', sans-serif"} sx={{ fontSize: 10 }}>
                    Expires on {product.expiration_date}
                </Typography>

                <Stack direction="row" justifyContent="end">
                    <MoreHorizIcon justify="flex-end" sx={{ color: "#BEE3DB" }} />
                </Stack>
            </CardContent>
        </Card>
    );
}