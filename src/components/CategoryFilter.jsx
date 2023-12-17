import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
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

export function CategoryFilter(props) {
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        props.setCategory(
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
                value={props.category}
                sx={{
                    m: 0.8, width: 116, height: 42, borderRadius: 5, backgroundColor: "#BEE3DB",
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#BEE3DB'
                    },
                    '& .MuiSvgIcon-root': {
                        color: '#555B6E'
                    }
                }}
                onChange={handleChange}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <Typography className='select-filter-text'>Category</Typography>;
                    }

                    return selected.join(', ');
                }}
                MenuProps={MenuProps}
            >
                <MenuItem className='select-filter-text' disabled value="">
                    <em className='select-filter-text'>Category</em>
                </MenuItem>
                {props.availableCategories.map((name) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={props.category.indexOf(name) > -1} />
                        <ListItemText className='select-filter-text' primary={name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}