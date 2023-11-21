import {
    Box
} from '@mui/material';

export function Header({title}) {
    return (
        <div>
            <Box style={{backgroundColor: '#BEE3DB', paddingTop: '35px', paddingBottom: '35px'}}>
            {title}
            </Box>
        </div>
    );
}