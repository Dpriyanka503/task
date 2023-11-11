import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Box, InputLabel, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {"Copyright © "}
            <Link color="inherit" href="#">
                Priyanka
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

export default function Auth() {
    const history = useHistory();
    const initialData = {
        name: "",
        password: "",
        email: "",
        phonenumber: "",
        category: "",
        showPassword: false,
    }
    const [formData, setFormData] = useState(initialData);
    const [isSignup, setIsSignUp] = useState(true);
    let text = isSignup ? "Sign Up" : "Sign In";
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const authHandler = () => {
        setIsSignUp(!isSignup);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {

            setFormData(initialData);
            localStorage.setItem('user', JSON.stringify(formData));
            setIsSignUp(false)
        }
        else {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser && formData.email === storedUser.email && formData.password === storedUser.password) {
                alert('LoggedIn successfully');
                history.replace('/movieapi');
            }
            else {
                alert('Invalid credentials');
            }
        }
    };

    const handleClickShowPassword = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                       
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {text}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {isSignup && (
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        value={formData.name}
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        name="name"
                                        autoComplete="name"
                                    />
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <TextField
                                    onChange={handleChange}
                                    value={formData.email}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    onChange={handleChange}
                                    value={formData.password}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={formData.showPassword ? "text" : "password"}
                                    id="password"
                                    autoComplete="password"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            {isSignup && (<Grid item xs={12}>
                                <TextField
                                    onChange={handleChange}
                                    value={formData.phonenumber}
                                    required
                                    fullWidth
                                    id="phonenumber"
                                    label="PhoneNumber"
                                    name="phonenumber"
                                    autoComplete="phonenumber"
                                    type="number"
                                    inputProps={{
                                        pattern: '[0-9]*',
                                    }}

                                />
                            </Grid>
                            )}
                            {isSignup && (
                                <Grid item xs={11}>
                                    <FormControl fullWidth>
                                        <InputLabel id="profession-category">Profession category</InputLabel>
                                        <Select
                                            label="category"
                                            name="category"
                                            onChange={handleChange}
                                            value={formData.category}
                                            id="category"
                                            labelId="category"
                                            required
                                        >
                                            <MenuItem value="Developer">Developer</MenuItem>
                                            <MenuItem value="Designer">Designer</MenuItem>
                                            <MenuItem value="Tester">Tester</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            )}
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            {text}
                        </Button>
                        <Button onClick={authHandler}>{isSignup ? "Sign In" : "Sign Up"}</Button>

                    </Box>
                </Box>
                <Copyright sx={{ mt: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

