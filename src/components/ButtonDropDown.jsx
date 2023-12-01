import { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

export const ButtonDropDown = ({ items, selectedItems, setSelectedItems }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (item) => {
    setSelectedItems(selectedItems.concat([item]));
    console.log(selectedItems)
    setAnchorEl(null);
  };

  const handleRemove = (item) => {
    setAnchorEl(null)
    let filteredArray = selectedItems.filter(i => i !== item)
    setSelectedItems(filteredArray)
  }

  return (
    <div>
      {selectedItems.length > 0 &&
        (
          selectedItems.map((selectedItem) => (
            <Button
              key={selectedItem}
              sx={{backgroundColor: "#BEE3DB", height: '29px', width: '80px', fontSize: '16px', textTransform: 'none', color: '#2A2E38', mr: 2}}
            >
              <HighlightOffRoundedIcon 
                onClick={() => handleRemove(selectedItem)}
                sx={{ color: '#555B6E', fontSize: '16px', position: 'absolute', top: -6.5, right: -8.5 }}
              />
                {selectedItem}
            </Button>
          ))
        )}

          <Button
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{border: 2, borderColor: "#BEE3DB", height: '29px', width: '80px', textTransform: 'none', color: '#2A2E38'}}
          ><AddIcon fontSize='small'/></Button>
      
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={(e) => setAnchorEl(null)}
        >
        {items.map((item) => (
            <MenuItem key={item} onClick={() => handleClick(item)}>
                {item}
            </MenuItem>
        ))}
      </Menu>
    </div>
  );
};