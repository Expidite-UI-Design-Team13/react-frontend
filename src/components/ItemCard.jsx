import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import '../styles/MainPage.css';
import { 
    MenuItem
} from '@mui/material';
import { StyledMenu } from './StyledMenu';
import { DeleteDialog } from './DeleteDialog';
import { ItemEditModal } from './ItemEditModal';

export function ItemCard(props) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleDelete = () => {
        setDeleteOpen(true);
        handleMenuClose();
    }

    const handleEdit = () => {
        setEditOpen(true);
        handleMenuClose();
    }

    const handleEditClose = () => setEditOpen(false);


    const expirationDate = new Date(props.product.expiration_date);
    const currentDate = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    const diffDays = Math.round((expirationDate - currentDate) / oneDay);

    const productionDate = new Date(props.product.production_date);
    const shelfLife = Math.round(Math.abs((expirationDate - productionDate) / oneDay));

    if (diffDays < 2) {
        return (
            <Card className="item-card-pink" sx={{ width: 170, height: 170, mb: 2, borderRadius: 3, backgroundColor: '#FAF9F9', boxShadow: 4 }}>
                <Typography className="item-title" color="#555B6E" align="center" gutterBottom="true" variant="subtitle1" fontFamily={"'Lato', sans-serif"} component="div">
                    {props.product.name}
                </Typography>
                <Avatar className="item-avatar-pink" alt={props.product.name} src={props.product.image.startsWith("http") ? props.product.image : require(`./images/${props.product.image}`)} sx={{ width: 62, height: 62 }} />
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
                        {diffDays < 0 ? (`Expired ${Math.abs(diffDays)} days ago`) : (`Expires in ${diffDays} day`)}
                    </Typography>
                    <Stack direction="row" justifyContent="end">
                        <MoreHorizIcon justify="flex-end" onClick={handleClick}  sx={{ color: "#FFD6BA" }} />
                        <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleMenuClose} disableRipple>
                            Refill
                            </MenuItem>
                            <MenuItem onClick={handleEdit} disableRipple>
                            Edit
                            </MenuItem>
                            <MenuItem onClick={handleDelete} disableRipple>
                            Delete
                            </MenuItem>
                        </StyledMenu>
                        <DeleteDialog setDeleteOpen={setDeleteOpen} deleteOpen={deleteOpen} name={props.product.name} productId={props.product.id} type="item" {...props} />
                        <ItemEditModal handleEditClose={handleEditClose} editOpen={editOpen} product={props.product} {...props} />
                    </Stack>
                </CardContent>
            </Card>
        );
    }
    return (
        <Card className="item-card" sx={{ width: 170, height: 170, mb: 2, borderRadius: 3, backgroundColor: '#FAF9F9', boxShadow: 4 }}>
            <Typography className="item-title" color="#555B6E" align="center" gutterBottom="true" variant="subtitle1" fontFamily={"'Lato', sans-serif"} component="div">
                {props.product.name}
            </Typography>
            <Avatar className="item-avatar" alt={props.product.name} src={
                (props.product.image === null || props.product.image === '') ? 
                    require(`./images/no_image.png`) : (props.product.image.startsWith("http") ? (props.product.image) : (require(`./images/${props.product.image}`)))
                    } sx={{ width: 62, height: 62 }} />
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
                    <MoreHorizIcon justify="flex-end" onClick={handleClick} sx={{ color: "#BEE3DB" }} />
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose} disableRipple>
                        Refill
                        </MenuItem>
                        <MenuItem onClick={handleEdit} disableRipple>
                        Edit
                        </MenuItem>
                        <MenuItem onClick={handleDelete} disableRipple>
                        Delete
                        </MenuItem>
                    </StyledMenu>
                </Stack>
                <DeleteDialog setDeleteOpen={setDeleteOpen} deleteOpen={deleteOpen} name={props.product.name} productId={props.product.id} type="item" {...props} />
                <ItemEditModal handleEditClose={handleEditClose} editOpen={editOpen} product={props.product} {...props} />
            </CardContent>
        </Card>
    );
}