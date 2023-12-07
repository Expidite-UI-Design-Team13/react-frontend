import { Box, Stack, Link } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

export function Header(props) {
    return (
        // The `div` is no longer necessary unless it serves other purposes not shown here.
        // The `Box` component is used directly as the outermost element.
        <Box style={{
            position: 'fixed', // Fix the position relative to the viewport
            top: 0, // Align to the top of the viewport
            left: 0, // Align to the left of the viewport
            right: 0, // Align to the right of the viewport
            backgroundColor: '#BEE3DB',
            padding: '3%', // Top and bottom padding
            zIndex: 1100, // Ensure the header is above other content
            fontFamily: `'Lato', 'sans-serif'`,
            color: '#555B6E'
        }}>
            {/* Page Title */}
            <Box style={{
                justifyContent: 'left',
                marginTop: '15px',
            }}>
                <Stack direction="row" justifyContent="space-between">
                <span style={{
                    fontSize: '26px',
                    fontFamily: 'Lato, sans-serif',
                    marginLeft: '10px',
                }}>
                    {props.title}
                    {/* Only show scan icon in header for new item page */} 
                </span>
                {props.title === "New Item" && (
                    <Link href="/scan">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0002 20H28.0002M27.5001 5.83331H30.8334C32.6744 5.83331 34.1668 7.3257 34.1668 9.16665V12.5M27.5001 34.1666H30.8334C32.6744 34.1666 34.1668 32.6743 34.1668 30.8333V27.5M12.5001 5.83331L9.16677 5.83331C7.32582 5.83331 5.83344 7.3257 5.83344 9.16665L5.83344 12.5M12.5001 34.1666H9.16677C7.32582 34.1666 5.83344 32.6743 5.83344 30.8333V27.5" stroke="#2A2E38" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Link>
                )}
                {props.title === "Edit Item" && (
                    <ClearRoundedIcon justify="flex-end" onClick={props.handleEditClose}/>
                )}
                </Stack>
            </Box>
        </Box>

    );
}