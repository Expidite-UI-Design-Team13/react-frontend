import { Box } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
export function Header({ title }) {
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
        }}>
            {/* Page Title */}
            <Box style={{
                display: 'flex',
                justifyContent: 'left',
                marginTop: '15px',
            }}>
                <span style={{
                    fontSize: '26px',
                    fontFamily: 'Lato, sans-serif',
                    marginLeft: '10px',
                }}>
                    {title}
                </span>
            </Box>
        </Box>
    );
}