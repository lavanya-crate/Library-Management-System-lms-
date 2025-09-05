// import React, { useState } from "react";
// import {
//     Box,
//     Typography,
//     TextField,
//     Button,
//     Link,
//     Paper,
//     IconButton,
//     InputAdornment
// } from "@mui/material";
// import loginImage from "../images/login-img.png";
// import { useNavigate } from "react-router-dom";
// import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

// export const SigninPage = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [emailError, setEmailError] = useState("");
//     const [passwordError, setPasswordError] = useState("");
//     const navigate = useNavigate();

//     const handleClickShowPassword = () => setShowPassword((show) => !show);
//     const handleMouseDownPassword = (e) => e.preventDefault();

//     const validateEmail = (email) => {
//         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return regex.test(email);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Reset errors
//         setEmailError("");
//         setPasswordError("");

//         let valid = true;

//         if (!email) {
//             setEmailError("Email is required");
//             valid = false;
//         } else if (!validateEmail(email)) {
//             setEmailError("Invalid email format");
//             valid = false;
//         }

//         if (!password) {
//             setPasswordError("Password is required");
//             valid = false;
//         }

//         if (!valid) return;

//         try {
//             const response = await fetch("http://localhost:5000/logincredentials", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 setEmailError(data.message || "Login failed");
//                 return;
//             }

//             localStorage.setItem("user", JSON.stringify(data.user));

//             if (data.role === "admin") {
//                 navigate("/admin");
//             } else if (data.role === "student") {
//                 navigate("/student");
//             }
//         } catch (error) {
//             setEmailError("Something went wrong. Please try again.");
//             console.error("Login error:", error);
//         } 
//         else {
//         navigate("/register");
//     }
//     };

//     return (
//         <Box
//             sx={{
//                 minHeight: "86vh",
//                 backgroundColor: "#e9e0f6",
//                 display: "flex",
//                 paddingLeft: 45,
//                 paddingTop: 7,
//                 paddingBottom: 7,
//             }}
//         >
//             <Paper
//                 sx={{
//                     display: "flex",
//                     flexDirection: { xs: "column", md: "row" },
//                     borderRadius: 4,
//                     overflow: "hidden",
//                     maxWidth: 1000,
//                 }}
//             >
//                 {/* Left Image */}
//                 <Box
//                     sx={{
//                         flex: 1,
//                         backgroundColor: "#fff",
//                         display: "flex",
//                         justifyContent: "flex-start",
//                         alignItems: "center",
//                         p: 2,
//                     }}
//                 >
//                     <Box
//                         component="img"
//                         src={loginImage}
//                         alt="Login illustration"
//                         sx={{
//                             width: 450,
//                             height: 600,
//                             objectFit: "cover",
//                             borderRadius: 2,
//                         }}
//                     />
//                 </Box>

//                 {/* Right Form */}
//                 <Box
//                     sx={{
//                         p: { xs: 3, md: 5 },
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "center",
//                         backgroundColor: "#fff",
//                         height: 600,
//                         width: 450,
//                     }}
//                 >
//                     <Typography variant="h5" fontWeight="bold" align="center" mb={2}>
//                         Login
//                     </Typography>

//                     <form onSubmit={handleSubmit}>
//                         <TextField
//                             margin="normal"
//                             fullWidth
//                             label="Email"
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             error={!!emailError}
//                             helperText={emailError}
//                         />

//                         <TextField
//                             margin="normal"
//                             fullWidth
//                             label="Password"
//                             type={showPassword ? "text" : "password"}
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             error={!!passwordError}
//                             helperText={passwordError}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         <IconButton
//                                             onClick={handleClickShowPassword}
//                                             onMouseDown={handleMouseDownPassword}
//                                             edge="end"
//                                         >
//                                             {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
//                                         </IconButton>
//                                     </InputAdornment>
//                                 ),
//                             }}
//                         />

//                         <Box
//                             sx={{
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                                 width: 400,
//                                 mt: 1,
//                                 mb: 2,
//                             }}
//                         >
//                             <Link href="#" variant="body2" underline="none">
//                                 Forget Password?
//                             </Link>
//                             <Link
//                                 component="button"
//                                 variant="body2"
//                                 onClick={toggleMode}
//                             >
                               
//                                    Don't have an account? Register
                                    
//                             </Link>
//                         </Box>

//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             sx={{
//                                 backgroundColor: "#6e2ca3",
//                                 color: "white",
//                                 textTransform: "none",
//                                 py: 1.5,
//                                 fontWeight: "bold",
//                                 borderRadius: 2,
//                             }}
//                         >
//                             Login
//                         </Button>
//                     </form>
//                 </Box>
//             </Paper>
//         </Box>
//     );
// };



import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Link,
    Paper,
    IconButton,
    InputAdornment
} from "@mui/material";
import loginImage from "../images/login-img.png";
import { useNavigate } from "react-router-dom";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export const SigninPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => e.preventDefault();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset errors
        setEmailError("");
        setPasswordError("");

        let valid = true;

        if (!email) {
            setEmailError("Email is required");
            valid = false;
        } else if (!validateEmail(email)) {
            setEmailError("Invalid email format");
            valid = false;
        }

        if (!password) {
            setPasswordError("Password is required");
            valid = false;
        }

        if (!valid) return;

        try {
            const response = await fetch("http://localhost:5000/logincredentials", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setEmailError(data.message || "Login failed");
                return;
            }

            localStorage.setItem("user", JSON.stringify(data.user));

            if (data.role === "admin") {
                navigate("/admin");
            } else if (data.role === "student") {
                navigate("/student");
            }
        } catch (error) {
            setEmailError("Something went wrong. Please try again.");
            console.error("Login error:", error);
        }
    };

    const toggleMode = () => {
        setEmail("");
        setPassword("");
        setEmailError("");
        setPasswordError("");
        navigate("/register");
    };
    

    return (
        <Box
            sx={{
                minHeight: "86vh",
                backgroundColor: "#e9e0f6",
                display: "flex",
                paddingLeft: 45,
                paddingTop: 7,
                paddingBottom: 7,
            }}
        >
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    borderRadius: 4,
                    overflow: "hidden",
                    maxWidth: 1000,
                }}
            >
                {/* Left Image */}
                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: "#fff",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        p: 2,
                    }}
                >
                    <Box
                        component="img"
                        src={loginImage}
                        alt="Login illustration"
                        sx={{
                            width: 450,
                            height: 600,
                            objectFit: "cover",
                            borderRadius: 2,
                        }}
                    />
                </Box>

                {/* Right Form */}
                <Box
                    sx={{
                        p: { xs: 3, md: 5 },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        backgroundColor: "#fff",
                        height: 600,
                        width: 450,
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" align="center" mb={2}>
                        Login
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!emailError}
                            helperText={emailError}
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!passwordError}
                            helperText={passwordError}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: 400,
                                mt: 1,
                                mb: 2,
                            }}
                        >
                            <Link href="#" variant="body2" underline="none">
                                Forget Password?
                            </Link>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={toggleMode}
                            >
                                Don't have an account? Register
                            </Link>
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: "#6e2ca3",
                                color: "white",
                                textTransform: "none",
                                py: 1.5,
                                fontWeight: "bold",
                                borderRadius: 2,
                            }}
                        >
                            Login
                        </Button>
                    </form>
                </Box>
            </Paper>
        </Box>
    );
};

