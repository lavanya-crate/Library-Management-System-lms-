import React, { useEffect, useState } from "react";
import {
  Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, IconButton
} from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';
import { StudentSidebar } from "./StudentSidebar";
import { useBorrow } from "../context/BorrowContext";

export const BorrowBook = () => {
  const { borrowedBooks, dispatch } = useBorrow();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const handleReturn = (book_id) => {
    dispatch({ type: "RETURN_BOOK", payload: book_id });
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
      <StudentSidebar />
      <Box sx={{ p: 3, ml: 60, mr: 20, mt: 10 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" mb={4}>Borrow Book</Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#6e2ca3" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Book Name</TableCell>
                <TableCell sx={{ color: "white" }}>Author</TableCell>
                <TableCell sx={{ color: "white" }}>Category</TableCell>
                <TableCell sx={{ color: "white" }}>Borrow Date</TableCell>
                <TableCell sx={{ color: "white" }}>Return Due Date</TableCell>
                <TableCell sx={{ color: "white" }}>Fine</TableCell>
                <TableCell sx={{ color: "white" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {borrowedBooks.length > 0 ? (
                borrowedBooks.map((book) => (
                  <TableRow key={book.book_id}>
                    <TableCell>{book.book_name}</TableCell>
                    <TableCell>{book.book_author}</TableCell>
                    <TableCell>{book.book_category}</TableCell>
                    <TableCell>{book.borrow_date}</TableCell>
                    <TableCell>{book.return_due_date}</TableCell>
                    <TableCell>{book.fine}</TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleReturn(book.book_id)}>
                        <ReplayIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">No books borrowed yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
