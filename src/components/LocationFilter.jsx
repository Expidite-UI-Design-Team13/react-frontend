import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import '../styles/MainPage.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const locations = [
    'kitchen',
    'bathroom',
    'living room',
    'storage room',
];

export function LocationFilter() {
    const [location, setLocation] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setLocation(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <FormControl>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                displayEmpty
                value={location}
                sx={{
                    m: 0.8, width: 107, height: 42, borderRadius: 5, backgroundColor: "#BEE3DB",
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#BEE3DB'
                    },
                    '& .MuiSvgIcon-root': {
                        color: '#555B6E'
                    },
                }}
                onChange={handleChange}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <Typography className='select-filter-text'>Location</Typography>;
                    }

                    return selected.join(', ');
                }}
                MenuProps={MenuProps}
            >
                <MenuItem className='select-filter-text' disabled value="">
                    <em className='select-filter-text'>Location</em>
                </MenuItem>
                {locations.map((name) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={location.indexOf(name) > -1} />
                        <ListItemText className='select-filter-text' primary={name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}