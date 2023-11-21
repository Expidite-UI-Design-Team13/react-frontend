import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export function ItemCard({item}) {
    return (
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component="div">
                    {item.name}
                </Typography>
                <Typography variant="body2">
                    expires {item.expiration_date}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">More</Button>
            </CardActions>
          </Card>
        </Box>
    );
}