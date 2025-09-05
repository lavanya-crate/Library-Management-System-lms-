// import React, { useEffect, useState } from "react";
// import {
//   Box, Card, CardContent, Typography, Grid,
//   TextField, Button
// } from "@mui/material";
// import { StudentSidebar } from "./StudentSidebar";
// import { useBorrow } from "../context/BorrowContext";

// export const BrowseBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [error, setError] = useState(null);
//   const { borrowedBooks, dispatch } = useBorrow();

//   const handleBorrowBook = (book) => {
//     dispatch({ type: "BORROW_BOOK", payload: book });
//   };

//   const isBookBorrowed = (bookId) =>
//     borrowedBooks.some((b) => b.book_id === bookId);


//   useEffect(() => {
//     const fetchBrowseImage = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/browseimage");
//         if (!response.ok) throw new Error("Failed to fetch data");
//         const data = await response.json();
//         setBooks(data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };
//     fetchBrowseImage();
//   }, []);

//   const filteredBooks = books.filter((book) =>
//     `${book.book_name} ${book.book_author} ${book.book_category}`
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   const renderImage = (image) => {
//     if (!image || !image.data) return null;
//     const base64String = btoa(
//       new Uint8Array(image.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
//     );
//     return `data:image/jpeg;base64,${base64String}`;
//   };

//   return (
//     <>
//       <StudentSidebar />
//       <Box sx={{ p: 3, ml: 50, mr: 20, mt: 10 }}>
//         <Typography variant="h4" gutterBottom fontWeight="bold" mb={2}>Browse Books</Typography>

//         <TextField
//           label="Search by name, author, or category"
//           variant="outlined"
//           fullWidth
//           sx={{ mb: 4 }}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <Grid container spacing={2}>
//           {filteredBooks.length === 0 ? (
//             <Typography variant="body1" p={2}>No books found.</Typography>
//           ) : (
//             filteredBooks.map((book) => (
//               <Grid item xs={12} sm={6} md={4} key={book.book_id}>
//                 <Card elevation={3} sx={{ width: 258, mb: 2 }}>
//                   {renderImage(book?.image) && (
//                     <img
//                       src={renderImage(book.image)}
//                       alt={book.book_name}
//                       width="100%"
//                       height="200px"
//                       style={{ objectFit: "cover" }}
//                     />
//                   )}
//                   <CardContent>
//                     <Typography variant="h6">{book.book_name}</Typography>
//                     <Typography variant="body2">Author: {book.book_author}</Typography>
//                     <Typography variant="body2">Category: {book.book_category}</Typography>
//                     <Button
//                       variant="contained"
//                       color={isBookBorrowed(book.book_id) ? "success" : "primary"}
//                       disabled={isBookBorrowed(book.book_id)}
//                       onClick={() => handleBorrowBook(book)}
//                       sx={{ mt: 1 }}
//                     >
//                       {isBookBorrowed(book.book_id) ? "Borrowed" : "Borrow Book"}
//                     </Button>

//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))
//           )}
//         </Grid>
//       </Box>
//     </>
//   );
// };




// import React, { useEffect, useState } from "react";
// import {
//   Box, Card, CardContent, Typography, Grid,
//   TextField, Button,
//   Avatar
// } from "@mui/material";
// import { StudentSidebar } from "./StudentSidebar";
// import { useBorrow } from "../context/BorrowContext";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import { Link } from "react-router-dom";


// export const BrowseBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [error, setError] = useState(null);
//   const { borrowedBooks, dispatch } = useBorrow();
//   const [wishlist, setWishlist] = useState([]);


//   const toggleWishlist = (bookId) => {
//     setWishlist((prevWishlist) =>
//       prevWishlist.includes(bookId)
//         ? prevWishlist.filter((id) => id !== bookId)
//         : [...prevWishlist, bookId]
//     );
//   };

//   const isWishlisted = (bookId) => wishlist.includes(bookId);


//   const handleBorrowBook = (book) => {
//     dispatch({ type: "BORROW_BOOK", payload: book });
//   };

//   const isBookBorrowed = (bookId) =>
//     borrowedBooks.some((b) => b.book_id === bookId);


//   useEffect(() => {
//     const fetchBrowseImage = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/browseimage");
//         if (!response.ok) throw new Error("Failed to fetch data");
//         const data = await response.json();
//         setBooks(data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };
//     fetchBrowseImage();
//   }, []);

//   const filteredBooks = books.filter((book) =>
//     `${book.book_name} ${book.book_author} ${book.book_category}`
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   const renderImage = (image) => {
//     if (!image || !image.data) return null;
//     const base64String = btoa(
//       new Uint8Array(image.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
//     );
//     return `data:image/jpeg;base64,${base64String}`;
//   };

//   return (
//     <>
//       <StudentSidebar />
//       <Box sx={{ p: 3, ml: 50, mr: 20, mt: 10 }}>
//         <Typography variant="h4" gutterBottom fontWeight="bold" mb={2}>Browse Books</Typography>
//         <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//           <TextField
//             label="Search by name, author, or category"
//             variant="outlined"
//             sx={{ mb: 4, width: 600 }}
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//        <Link to="/wishlist" style={{ textDecoration: "none" }}>
//       <Avatar sx={{ cursor: "pointer", bgcolor: "#eeeeee", color: "black" }}>
//         <FavoriteBorderIcon />
//       </Avatar>
//     </Link>
//         </Box>
//         <Grid container spacing={2}>
//           {filteredBooks.length === 0 ? (
//             <Typography variant="body1" p={2}>No books found.</Typography>
//           ) : (
//             filteredBooks.map((book) => (
//               <Grid item xs={12} sm={6} md={4} key={book.book_id}>
//                 <Card elevation={3} sx={{ width: 258, mb: 2 }}>
//                   {renderImage(book?.image) && (
//                     <img
//                       src={renderImage(book.image)}
//                       alt={book.book_name}
//                       width="100%"
//                       height="200px"
//                       style={{ objectFit: "cover" }}
//                     />
//                   )}
//                   <CardContent>
//                     <Typography variant="h6">{book.book_name}</Typography>
//                     <Typography variant="body2">Author: {book.book_author}</Typography>
//                     <Typography variant="body2">Category: {book.book_category}</Typography>

//                     <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
//                       <Button
//                         variant="contained"
//                         color={isBookBorrowed(book.book_id) ? "success" : "primary"}
//                         disabled={isBookBorrowed(book.book_id)}
//                         onClick={() => handleBorrowBook(book)}
//                       >
//                         {isBookBorrowed(book.book_id) ? "Borrowed" : "Borrow Book"}
//                       </Button>

//                       <Box
//                         onClick={() => toggleWishlist(book.book_id)}
//                         sx={{ cursor: "pointer" }}
//                       >
//                         {isWishlisted(book.book_id) ? (
//                           <FavoriteIcon color="error" />
//                         ) : (
//                           <FavoriteBorderIcon />
//                         )}
//                       </Box>
//                     </Box>


//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))
//           )}
//         </Grid>
//       </Box>
//     </>
//   );
// };


import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  Card,
  CardContent,
  Grid,
  Avatar,
} from "@mui/material";
import { StudentSidebar } from "./StudentSidebar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import { useBorrow } from "../context/BorrowContext";



export const BrowseBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
 const { borrowedBooks, dispatch } = useBorrow();
 
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (bookId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(bookId)
        ? prevWishlist.filter((id) => id !== bookId)
        : [...prevWishlist, bookId]
    );
  };

  const isWishlisted = (bookId) => wishlist.includes(bookId);

 const handleBorrowBook = (book) => {
    dispatch({ type: "BORROW_BOOK", payload: book });
  };

  const isBookBorrowed = (bookId) =>
    borrowedBooks.some((b) => b.book_id === bookId);

  useEffect(() => {
    const fetchBooksData = async () => {
      setLoading(true);
      setError(null);
      try {

        const response = await fetch("http://localhost:5000/browseimage");
        if (!response.ok) {
          throw new Error(`Failed to fetch books data: ${response.statusText}`);
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooksData();
  }, []);

  const filteredBooks = books.filter((book) =>
    `${book.book_name || ""} ${book.book_author || ""} ${book.category_name || ""}` 
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const renderImage = (imageData) => {

    if (imageData && imageData.data && Array.isArray(imageData.data)) {
      try {
        const base64String = btoa(
          new Uint8Array(imageData.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
        );
        return `data:image/jpeg;base64,${base64String}`;
      } catch (e) {
        console.error("Error converting image data to base64:", e);
        return;
      }
    }
    return;
  };




  return (
    <>
      <StudentSidebar />
      <Box sx={{ p: 3, ml: 50, mr: 20, mt: 10 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" mb={2}>
          Browse Books
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <TextField
            label="Search by name, author, or category"
            variant="outlined"
            sx={{ mb: 4, width: 600 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to="/wishlist" style={{ textDecoration: "none" }}>
            <Avatar
              sx={{
                cursor: "pointer",
                bgcolor: "#eeeeee",
                color: "black",
                mb: 4,
                ml: 2,
              }}
            >
              <FavoriteBorderIcon />
            </Avatar>
          </Link>
        </Box>

        <Grid container spacing={3}>
          {filteredBooks.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="body1" p={2}>
                No books found matching your search.
              </Typography>
            </Grid>
          ) : (
            filteredBooks.map((book) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={book.book_id}>
                <Card
                  elevation={4}
                  sx={{
                    width: 340,
                    height: 420,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={renderImage(book.image)}
                    alt={book.book_name}
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                      justifyContent: "space-between",
                      p: 2,
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 1,
                          fontWeight: "medium",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {book.book_name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Author: {book.book_author}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Category: {book.category_name || "N/A"}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: isBookBorrowed(book.book_id)
                            ? "#4caf50"
                            : "#6e2ca3",
                          "&:hover": {
                            backgroundColor: isBookBorrowed(book.book_id)
                              ? "#388e3c"
                              : "#5a2283",
                          },
                          borderRadius: 2,
                          fontSize: "0.75rem",
                          // paddingX: 1.5,
                        }}
                        disabled={
                          isBookBorrowed(book.book_id) || book.book_copies <= 0
                        }
                        onClick={() => handleBorrowBook(book)}
                      >
                        {book.book_copies <= 0
                          ? "Out of Stock"
                          : isBookBorrowed(book.book_id)
                            ? "Borrowed"
                            : "Borrow"}
                      </Button>

                      <IconButton
                        onClick={() => toggleWishlist(book.book_id)}
                        color={isWishlisted(book.book_id) ? "error" : "default"}
                        aria-label="add to wishlist"
                      >
                        {isWishlisted(book.book_id) ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

      </Box>
    </>
  );


};
