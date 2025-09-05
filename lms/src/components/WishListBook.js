import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material';
import image from "../images/books.avif";
import { Link, useNavigate } from 'react-router-dom';
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const WishListBooks = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    if (path) navigate(path);
  };

  const toggleWishlist = (bookId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(bookId)
        ? prevWishlist.filter((id) => id !== bookId)
        : [...prevWishlist, bookId]
    );
  };

  // const isWishlisted = (bookId) => wishlist.includes(bookId);

  const renderImage = (image) => {
    if (!image || !image.data) return null;
    const base64String = btoa(
      new Uint8Array(image.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
    return `data:image/jpeg;base64,${base64String}`;
  };

  useEffect(() => {
    const fetchBrowseImage = async () => {
      try {
        const response = await fetch("http://localhost:5000/browseimage");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchBrowseImage();
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: '#e9e0f6',
            color: 'black',
            boxShadow: 'none',
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: 20, marginRight: 20 }}>
            <Box sx={{ display: "flex", gap: 5, mt: 1, pb: 1, alignItems: "center" }}>
              <img src={image} alt="Category" style={{ width: 70, height: 60, objectFit: "cover", borderRadius: 2 }} />
              <Typography variant="h4" fontWeight="bold">
                Library Management System
              </Typography>
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
      </Box>

      <Container maxWidth="lg" sx={{ p: 3, mt: 12, mr: 25 }}>
        <Box sx={{ display: "flex" }}>
          <Link to="/browsebooks">
            <ArrowBackIcon />
          </Link>
          <Typography sx={{ml:50}} variant="h4" gutterBottom fontWeight="bold" mb={6}>Wishlist Books</Typography>

        </Box>
        <Grid container spacing={2}>
          {books.length === 0 ? (
            <Typography variant="body1" p={2}>No books found.</Typography>
          ) : (
            books.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.book_id}>
                <Card elevation={3} sx={{ width: 258, mb: 2 }}>
                  {renderImage(book?.image) && (
                    <img
                      src={renderImage(book.image)}
                      alt={book.book_name}
                      width="100%"
                      height="200px"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6">{book.book_name}</Typography>
                    <Typography variant="body2">Author: {book.book_author}</Typography>
                    <Typography variant="body2">Category: {book.book_category}</Typography>

                    <Box display="flex" justifyContent="flex-end" alignItems="center" mt={1}>
                      <Box
                        onClick={() => toggleWishlist(book.book_id)}
                        sx={{ cursor: "pointer" }}
                      >

                        <FavoriteIcon color="error" />


                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </>
  );
};

