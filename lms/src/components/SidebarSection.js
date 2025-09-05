// import { useNavigate } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
// import { useState } from 'react';
// const drawerWidth = 260;

// export const SidebarSection = () => {
//     const navigate = useNavigate();
//     const [anchorEl, setAnchorEl] = useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//     const handleNavigation = (path) => {
//         if (path) navigate(path);
//     };

//     const hoverStyle = {
//         '&:hover': {
//             bgcolor: '#b39ddb',
//             borderRadius: 3,
//         },
//     };

//     return (
//         <Box sx={{ display: 'flex', backgroundColor: "#e9e0f6", }}>
//              <AppBar
//         position="fixed"
//         sx={{
//           width: `calc(100% - ${drawerWidth}px)`,
//           ml: `${drawerWidth}px`,
//           backgroundColor: '#e9e0f6',
//           color: 'black',
//           boxShadow: 'none'
//         }}
//       >
//         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Typography variant="h5" fontWeight="bold">
//             Library Management System
//           </Typography>
       
//  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//       <Typography
//         variant="h6"
//         onClick={() => handleNavigation("/sign")}  // 👈 Navigate to login
//         sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
//       >
//         Sign In
//       </Typography>

//       <IconButton onClick={handleClick}>
//         <Avatar alt="User Avatar" src="" />
//       </IconButton>

//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         PaperProps={{
//           elevation: 4,
//           sx: {
//             mt: 1.5,
//             minWidth: 150,
//           },
//         }}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//       >
//         <MenuItem onClick={handleClose}>Profile</MenuItem>
//         <MenuItem onClick={handleClose}>Account</MenuItem>
//         <MenuItem onClick={() => handleNavigation("/")}>Dashboard</MenuItem>
//         <MenuItem onClick={() => handleNavigation("/logout")}>Logout</MenuItem>
//       </Menu>
//     </Box>

//         </Toolbar>
//       </AppBar>

//             <Drawer
//                 variant="permanent"
//                 sx={{
//                     width: drawerWidth,
//                     flexShrink: 0,
//                     [`& .MuiDrawer-paper`]: {
//                         width: drawerWidth,
//                         boxSizing: 'border-box',
//                         backgroundColor: "#6e2ca3",
//                     },
//                 }}
//             >
//                 <Toolbar />
//                 <Box sx={{ overflow: 'auto', p: 2 }}>
//                     <Typography variant="h5" fontWeight="bold" textAlign="left" sx={{ mb: 1, color: "white" }}>
//                         Home
//                     </Typography>
//                     {/* <List>

//                         <ListItemButton
//                             sx={{ ...hoverStyle }}
//                             onClick={() => handleNavigation('/register')}
//                         >
//                             <ListItemText primary="Log In" sx={{ color: "white" }} />
//                         </ListItemButton>
//                         <ListItemButton
//                             sx={{ ...hoverStyle }}
//                             onClick={() => handleNavigation('/logout')}
//                         >
//                             <ListItemText primary="Log Out" sx={{ color: "white" }} />
//                         </ListItemButton>
//                     </List> */}

//                     <Divider sx={{ my: 2 }} />
//                     <Typography variant="h5" fontWeight="bold" textAlign="left" sx={{ mb: 1, color: "white" }}>
//                         Librarian
//                     </Typography>
//                     <List>
//                         <ListItemButton
//                             sx={{ ...hoverStyle }}
//                             onClick={() => handleNavigation('/categories')}
//                         >
//                             <ListItemText primary="Categories" sx={{ color: "white" }} />
//                         </ListItemButton>
//                         <ListItemButton
//                             sx={{ ...hoverStyle }}
//                             onClick={() => handleNavigation('/books')}
//                         >
//                             <ListItemText variant='h5' fontWeight="bold" sx={{ color: "white" }} />
//                         </ListItemButton>
//                         <ListItemButton
//                             sx={{ ...hoverStyle }}
//                             onClick={() => handleNavigation('/authors')}
//                         >
//                             <ListItemText primary="Authors" sx={{ color: "white" }} />
//                         </ListItemButton>
//                         <ListItemButton
//                             sx={{ ...hoverStyle }}
//                             onClick={() => handleNavigation('/membership')}
//                         >
//                             <ListItemText primary="Membership" sx={{ color: "white" }} />
//                         </ListItemButton>
//                     </List>

//                     <Divider sx={{ my: 2 }} />
//                     <Typography variant="h5" fontWeight="bold" textAlign="left" sx={{ mb: 1, color: "white" }}>
//                         Student
//                     </Typography>
//                     <List>
//                         <ListItemButton
//                             sx={{ ...hoverStyle }}
//                             onClick={() => handleNavigation('/borrow')}
//                         >
//                             <ListItemText primary="Borrow Book" sx={{ color: "white" }} />
//                         </ListItemButton>
//                         <ListItemButton
//                             sx={{ ...hoverStyle }}
//                             onClick={() => handleNavigation('/return')}
//                         >
//                             <ListItemText primary="Return Book" sx={{ color: "white" }} />
//                         </ListItemButton>
//                     </List>
//                 </Box>
//             </Drawer>
//             {/* 
//             <Box sx={{ flexGrow: 1, mt: 8, p: 3 }}>
              
//             </Box> */}
//         </Box>
//     );
// };



import { useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  Divider,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import image from "../images/books.avif";
import InboxIcon from '@mui/icons-material/Inbox';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';


const drawerWidth = 260;

export const SidebarSection = () => {
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
       alignItems:"center"
    },
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: "#e9e0f6", position:"fixed" }}>
      {/* AppBar Header */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: '#e9e0f6',
          color: 'black',
          boxShadow: 'none',
        }}
      >
       <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', marginRight:20 }}>
                  <Box display={'flex'}>
                    <Box sx={{ display: "flex", gap: 5, mt:1, pb:1, alignItems:"center"}}>
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
                      <MenuItem onClick={() => handleNavigation("/dashboard")}>Dashboard</MenuItem>
                      <MenuItem onClick={() => handleNavigation("/logout")}>Logout</MenuItem>
                    </Menu>
                  </Box>
                </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
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
          <Typography variant="h4" fontWeight="bold"  textAlign="left" sx={{ mb: 1, color: "white", alignItems:"center" }}onClick={() => handleNavigation('/admin')}>
         Admin 
          </Typography>

          <Divider sx={{ my: 2 }} />

          <List>
            <ListItemButton sx={hoverStyle} onClick={() => handleNavigation('/categories')}>
              <Typography variant='h5' fontWeight="bold" sx={{ color: "white",py:1, mb:1 }} ><InboxIcon  sx={{pr:2}}/>Categories </Typography>
            </ListItemButton>
            <ListItemButton sx={hoverStyle} onClick={() => handleNavigation('/books')}>
              <Typography variant='h5' fontWeight="bold" sx={{ color: "white",py:1, mb:1}} ><MenuBookIcon  sx={{pr:2}}/>Books </Typography>
            </ListItemButton>
            <ListItemButton sx={hoverStyle} onClick={() => handleNavigation('/membership')}>
              <Typography variant='h5' fontWeight="bold" sx={{ color: "white", py:1, mb:1}} ><PeopleIcon  sx={{pr:2}}/>Membership</Typography>
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

