import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { StudentSidebar } from "./StudentSidebar";


// Initial borrowed books data
const initialBorrowedBooks = [
  { id: 1, name: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", borrowDate: "2023-08-01", returnDate: "2023-08-01", fine: "0" },
  { id: 2, name: "Atomic Habits", author: "James Clear", category: "Self Help", borrowDate: "2023-08-05", returnDate: "2023-08-05", fine: "0" },
  { id: 3, name: "1984", author: "George Orwell", category: "Fiction", borrowDate: "2023-08-10", returnDate: "2023-08-10", fine: "0" },
  { id: 4, name: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Finance", borrowDate: "2023-09-01", returnDate: "2023-09-01", fine: "0" },
  { id: 5, name: "Clean Code", author: "Robert C. Martin", category: "Programming", borrowDate: "2023-07-15", returnDate: "2023-07-15", fine: "0" },
  { id: 6, name: "Deep Work", author: "Cal Newport", category: "Self Help", borrowDate: "2023-09-10", returnDate: "2023-09-10", fine: "0" },
];

export const StudentHistory = () => {
  const [borrowedBooks, setBorrowedBooks] = useState(initialBorrowedBooks);

  const categories = [...new Set(initialBorrowedBooks.map(book => book.category))];

  return (
    <>
    <StudentSidebar />
    <Box sx={{ p: 3, ml: 50, mr: 20, mt: 10 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" mb={4}>Student History</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: "#6e2ca3" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}><strong>Book Name</strong></TableCell>
              <TableCell sx={{ color: "white" }}><strong>Author</strong></TableCell>
              <TableCell sx={{ color: "white" }}><strong>Category</strong></TableCell>
              <TableCell sx={{ color: "white" }}><strong>Borrow Date</strong></TableCell>
              <TableCell sx={{ color: "white" }}><strong>Return Date</strong></TableCell>
              <TableCell sx={{ color: "white" }}><strong>Fine</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {borrowedBooks.length > 0 ? (
              borrowedBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.name}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>{book.borrowDate}</TableCell>
                  <TableCell>{book.returnDate}</TableCell>
                  <TableCell>{book.fine}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No books borrowed yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </>
  );
};
