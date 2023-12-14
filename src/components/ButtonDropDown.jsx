import { useState } from "react";
import { Menu, MenuItem, Button, Stack, Box, Divider } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteDialog } from "./DeleteDialog";
import { EditCategoryModal } from "./EditCategoryModal";
import { EditLocationModal } from "./EditLocationModal";

export const ButtonDropDown = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const handleClick = (item) => {
    props.setSelectedItems(props.selectedItems.concat([item]));
    setAnchorEl(null);
  };

  const handleRemove = (item) => {
    setAnchorEl(null)
    let filteredArray = props.selectedItems.filter(i => i !== item)
    props.setSelectedItems(filteredArray)
  }

  const handleDelete = async () => {
    setDeleteOpen(true)
  }

  const handleEdit = async () => {
    setEditOpen(true)
  }

  return (
    <div>
      {props.selectedItems.length > 0 &&
        (
          props.selectedItems.map((selectedItem) => (
              <Button
                key={selectedItem}
                sx={{backgroundColor: "#BEE3DB", height: '29px', width: '80px', fontSize: '16px', textTransform: 'none', color: '#2A2E38', mr: 2}}
              >
                <HighlightOffRoundedIcon 
                  onClick={() => handleRemove(selectedItem)}
                  sx={{ color: '#555B6E', fontSize: '16px', position: 'absolute', top: -6.5, right: -8.5 }}
                />
                  <Stack direction="row">
                    {selectedItem}
                  </Stack>
              </Button>
          ))
        )}

          <Button
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{border: 2, borderColor: "#BEE3DB", height: '29px', width: '80px', textTransform: 'none', color: '#2A2E38'}}
          >
            <AddIcon fontSize='small'/>
          </Button>
      
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={(e) => setAnchorEl(null)}
        >
        <MenuItem>
            <div onClick={props.handleAdd}>
              {props.type=="category" && (
                "New Category"
              )}
              {props.type=="location" && (
                "New Location"
              )}
              <Divider sx={{mt: 1, width: 140}}/>
            </div>
        </MenuItem>
        {props.items.map((item) => (
          <div>
            <MenuItem key={item}>
              <div onClick={() => handleClick(item)}>{item}</div>
              <Box sx={{right: 14, position: "absolute"}}>
                <EditIcon onClick={handleEdit} fontSize="16" sx={{mr: 0.5, color: "#555B6E"}}/>
                <DeleteIcon onClick={handleDelete} fontSize="16" sx={{color: "#555B6E"}}/>
              </Box>
            </MenuItem>
            <DeleteDialog setDeleteOpen={setDeleteOpen} deleteOpen={deleteOpen} name={item} type={props.type} {...props} />
            {props.type=="category" && (
              <EditCategoryModal setEditOpen={setEditOpen} editOpen={editOpen} currentCategory={item} {...props}/>
            )}
            {props.type=="location" && (
              <EditLocationModal setEditOpen={setEditOpen} editOpen={editOpen} currentLocation={item} {...props}/>
            )}
          </div>
        ))}
      </Menu>
    </div>
  );
};