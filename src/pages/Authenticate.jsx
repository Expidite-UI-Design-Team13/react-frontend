import { Button } from "@mui/material";

export function Authenticate({setToken}) {
    return (
        <div>
            <Button variant="contained" href="/login" sx={{backgroundColor: "#89B0AE"}}>Login</Button>
            <Button variant="outlined" href="/signup" sx={{borderColor: "#89B0AE", color: "#555B6E"}}>Signup</Button>
        </div>
    );
}   