import { Menu } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';

export const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 12,
      marginTop: theme.spacing(1),
      minWidth: 110,
      minHeight: 103,
      color: '#555B6E',
      boxShadow:
        'rgb(0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 10px 15px -3px, rgba(0, 0, 0, 0) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: 'theme.palette.text.secondary',
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: 'white'
        },
      },
    },
  }));