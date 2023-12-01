import { Box } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
export function Header({ title }) {
    return (
        // The `div` is no longer necessary unless it serves other purposes not shown here.
        // The `Box` component is used directly as the outermost element.
        <Box style={{
            position: 'sticky', // Fix the position relative to the viewport, make sure the header does not overlap with page content
            top: 0, // Align to the top of the viewport
            left: 0, // Align to the left of the viewport
            right: 0, // Align to the right of the viewport
            backgroundColor: '#BEE3DB',
            padding: '3%', // Top and bottom padding
            zIndex: 1100, // Ensure the header is above other content
        }}>
            {/* Status bar */}
            <Box style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 10px', // Padding on the sides
                fontSize: '18px', // Smaller font size for status bar items
                fontFamily: 'Lato, sans-serif'
            }}>
                <span style={{ fontWeight: 'bold' }}>
                    19:02
                </span> {/* Time */}
                <Box style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px', // Space between icons
                }}>
                    <SignalCellularAltIcon fontSize="medium" />
                    <WifiIcon fontSize="medium" />
                    <BatteryFullIcon fontSize="medium" />
                </Box>
            </Box>
            {/* Page Title */}
            <Box style={{
                display: 'flex',
                justifyContent: 'left',
                marginTop: '15px',
            }}>
                <span style={{
                    fontSize: '36px',
                    fontFamily: 'Lato, sans-serif',
                    marginLeft: '6px',
                }}>
                    {title}
                </span>
            </Box>
        </Box>
    );
}