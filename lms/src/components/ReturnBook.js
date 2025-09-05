import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CardMedia,
} from "@mui/material";


const initialBorrowedBooks = [
  {
    id: 1,
    studentId: "STU001",
    name: "Atomic Habits",
    author: "James Clear",
    borrowDate: "2025-06-01",
    returnDate: "2025-06-08",
    // image: image,
    image: "images/book1.webp"
  },
  {
    id: 2,
    studentId: "STU002",
    name: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    borrowDate: "2025-06-02",
    returnDate: "2025-06-09",
    image: "/images/book2.avif",
  },
  {
    id: 3,
    studentId: "STU003",
    name: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    borrowDate: "2025-06-03",
    returnDate: "2025-06-10",
    image: "/images/book1.webp",
  },
  {
    id: 4,
    studentId: "STU004",
    name: "India het",
    author: "George Orwell",
    borrowDate: "2025-06-04",
    returnDate: "2025-06-11",
    image: "/images/book2.avif",
  },
  {
    id: 5,
    studentId: "STU005",
    name: "Deep Work",
    author: "Cal Newport",
    borrowDate: "2025-06-05",
    returnDate: "2025-06-12",
    image: "/images/book1.webp",
  },
  {
    id: 6,
    studentId: "STU006",
    name: "The Alchemist",
    author: "Paulo Coelho",
    borrowDate: "2025-06-06",
    returnDate: "2025-06-13",
    image: "/images/book2.avif",
  },
  {
    id: 7,
    studentId: "STU007",
    name: "Start With Why",
    author: "Simon Sinek",
    borrowDate: "2025-06-07",
    returnDate: "2025-06-14",
    image: "/images/book1.webp",
  },
  {
    id: 8,
    studentId: "STU008",
    name: "Clean Code",
    author: "Robert C. Martin",
    borrowDate: "2025-06-08",
    returnDate: "2025-06-15",
    image: "/images/book2.avif",
  },
  // {
  //   id: 9,
  //   studentId: "STU009",
  //   name: "To Kill a Mockingbird",
  //   author: "Harper Lee",
  //   borrowDate: "2025-06-09",
  //   returnDate: "2025-06-16",
  // },
  // {
  //   id: 10,
  //   studentId: "STU010",
  //   name: "Thinking, Fast and Slow",
  //   author: "Daniel Kahneman",
  //   borrowDate: "2025-06-10",
  //   returnDate: "2025-06-17",
  // },
];


export const ReturnBook = () => {
  const [borrowedBooks, setBorrowedBooks] = useState(initialBorrowedBooks);

  const handleReturn = (id) => {
    const updated = borrowedBooks.filter((book) => book.id !== id);
    setBorrowedBooks(updated);
  };

  return (
    <Box sx={{ p: 3, ml: 50, mr: 20, mt: 10 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" mb={4}>
        Return Books
      </Typography>

      <Grid container spacing={2}>
        {borrowedBooks.length === 0 ? (
          <Typography variant="body1" p={2}>
            No borrowed books.
          </Typography>
        ) : (
          borrowedBooks.map((book) => (

              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <Card elevation={3} sx={{ width: 250,mb:2,ml:1}}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={book.image} 
                    alt={book.name}
                  />
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                      Student ID: {book.studentId}
                    </Typography>
                    <Typography variant="h6">{book.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Author: {book.author}
                    </Typography>
                    <Typography variant="body2">
                      Borrowed: {book.borrowDate}
                    </Typography>
                    <Typography variant="body2">
                      Return By: {book.returnDate}
                    </Typography>
                    <Box mt={2}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleReturn(book.id)}
                      >
                        Return Book
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};



