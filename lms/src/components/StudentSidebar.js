import React from 'react'
import {
    Box, Typography, AppBar,
    Toolbar, IconButton,
    Avatar,
    Menu,
    MenuItem,
    Drawer,
    Divider,
    List,
    ListItemButton
} from "@mui/material";
import BookIcon from '@mui/icons-material/Book';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import image from "../images/books.avif";
const drawerWidth = 300;

export const StudentSidebar = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (path) => {
        if (path) navigate(path);
    };

    const hoverStyle = {
        '&:hover': {
            bgcolor: '#b39ddb',
            borderRadius: 3,
            alignItems: "center"
        },
    };

  return (
    <>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: '#e9e0f6',
                    color: 'black',
                    boxShadow: 'none',
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: 40, marginRight: 20 }}>
                    <Box display={'flex'}>
                        <Box sx={{ display: "flex", gap: 5, mt: 1, pb: 1, alignItems: "center" }}>
                            <img src={image} alt="Category" style={{ width: 70, height: 60, objectFit: "cover", borderRadius: 2 }} />
                            <Typography variant="h4" fontWeight="bold" >
                                Library Management System
                            </Typography>
                        </Box>

                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <Typography
                            variant="h6"
                            onClick={() => handleNavigation("/")}
                            sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
                        >
                            Sign In
                        </Typography>

                        <IconButton onClick={handleClick}>
                            <Avatar alt="User Avatar" src="" />
                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            PaperProps={{
                                elevation: 4,
                                sx: { mt: 1.5, minWidth: 150 },
                            }}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>Account</MenuItem>
                            <MenuItem onClick={() => handleNavigation("/")}>Dashboard</MenuItem>
                            <MenuItem onClick={() => handleNavigation("/logout")}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>


            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: "#6e2ca3",
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'hidden', p: 2 }}>
                    <Typography variant="h4" fontWeight="bold" textAlign="left" sx={{ mb: 1, color: "white", alignItems: "center" }} onClick={() => handleNavigation('/student')}>
                        Student
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <List>
                        <ListItemButton sx={hoverStyle} onClick={() => handleNavigation('/browsebooks')}>
                            <Typography variant='h5' fontWeight="bold" sx={{ color: "white", py: 1, mb: 1 }} ><BookIcon sx={{ pr: 2 }} />Browse Books </Typography>
                        </ListItemButton>
                        <ListItemButton sx={hoverStyle} onClick={() => handleNavigation('/borrow')}>
                            <Typography variant='h5' fontWeight="bold" sx={{ color: "white", py: 1, mb: 1 }} ><BookIcon sx={{ pr: 2 }} />Borrow Book </Typography>
                        </ListItemButton>
                        {/* <ListItemButton sx={hoverStyle} onClick={() => handleNavigation('/student-history')}>
                            <Typography variant='h5' fontWeight="bold" sx={{ color: "white", py: 1, mb: 1 }} ><AssignmentReturnIcon sx={{ pr: 2 }} />Student History </Typography>
                        </ListItemButton> */}
                    </List>
                </Box>
            </Drawer>
    </>
  )
}
