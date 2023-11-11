import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, Card, CardContent } from "@mui/material";

import { Stack, Button } from "@mui/material";
import { useState } from "react";

const Header = () => {
    const [companyInfoVisible, setCompanyInfoVisible] = useState(false);

    const handleCompanyInfo = () => {
        setCompanyInfoVisible(!companyInfoVisible);
    };
   
    return (
        <>
            <AppBar
                position="static"
                sx={{
                    bgcolor: 'primary',
                    borderBottom: "2px solid #grey",
                }}
            >
                <Toolbar>
                    <Typography variant="h5" component="h1" color="inherit" fontWeight="bold">
                       Movie API
                    </Typography>
                    <Box ml="auto">
                        <Stack direction="row">
                            <Button variant="outlined" color="inherit" size="small" sx={{ mt: 3, mb: 2 }} onClick={handleCompanyInfo}>Company Info</Button>
                        </Stack>
                    </Box>
                </Toolbar>
            </AppBar>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {companyInfoVisible && (
                    <Card sx={{ width: 320, textAlign: 'center' ,margin:'1rem'}}>
                        <CardContent>
                            <Typography>Company: Geeksynergy Technologies Pvt Ltd</Typography>
                            <Typography>Address: Sanjayanagar, Bengaluru-56</Typography>
                            <Typography>Phone: XXXXXXXXX09</Typography>
                            <Typography>Email: XXXXXX@gmail.com</Typography>
                        </CardContent>
                    </Card>
                )}
            </div>


        </>
    )
}
export default Header;

