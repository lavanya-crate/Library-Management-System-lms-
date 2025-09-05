// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Stack,
//   Pagination,
//   IconButton,
//   InputAdornment,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Divider,
//   Typography,
//   MenuItem,
//   CircularProgress,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
//  import image from "../images/category.jpg";
// import { SidebarSection } from "./SidebarSection";

// export const BookSection = () => {
//   const [books, setBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Dialog states for Add/Edit
//   const [openAddDialog, setOpenAddDialog] = useState(false);
//   const [openEditDialog, setOpenEditDialog] = useState(false);

//   // States for the Add Book form
//   const [newBook, setNewBook] = useState({
//     name: "",
//     author: "",
//     publisher: "",
//     category_id: "",
//     copies: "",
//   });

//   // State for the Edit Book form
//   const [editingBook, setEditingBook] = useState(null);
//   const [categories, setCategories] = useState([]); 

//   // States for custom alert/confirm dialogs
//   const [openAlertDialog, setOpenAlertDialog] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertTitle, setAlertTitle] = useState("");

//   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
//   const [confirmMessage, setConfirmMessage] = useState("");
//   const [confirmAction, setConfirmAction] = useState(null); 
//   const [confirmTitle, setConfirmTitle] = useState(""); 

//   const itemsPerPage = 5;

//   // Function to show custom alert dialog
//   const showAlert = (title, message) => {
//     setAlertTitle(title);
//     setAlertMessage(message);
//     setOpenAlertDialog(true);
//   };

//   // Function to show custom confirmation dialog
//   const showConfirm = (title, message, action) => {
//     setConfirmTitle(title);
//     setConfirmMessage(message);
//     setConfirmAction(() => action); // Store the function to be called on confirm
//     setOpenConfirmDialog(true);
//   };

//   // Fetch Books and Categories on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const [booksResponse, categoriesResponse] = await Promise.all([
//           fetch(`http://localhost:5000/books`),
//           fetch(`http://localhost:5000/categories`),
//         ]);

//         if (!booksResponse.ok) {
//           throw new Error(`Failed to fetch books data: ${booksResponse.statusText}`);
//         }
//         if (!categoriesResponse.ok) {
//           throw new Error(`Failed to fetch categories data: ${categoriesResponse.statusText}`);
//         }

//         const booksData = await booksResponse.json();
//         const categoriesData = await categoriesResponse.json();

//         setCategories(categoriesData);
//         setBooks(booksData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []); // Empty dependency array means this runs once on mount

//   // Helper function to get category name by ID
//   const getCategoryNameById = (categoryId) => {
//     if (!categories || categories.length === 0 || categoryId === undefined || categoryId === null) {
//       return "N/A";
//     }
//     // Use parseInt for robust comparison as IDs can sometimes be string/number mix
//     const category = categories.find((cat) => parseInt(cat.category_id) === parseInt(categoryId));
//     return category ? category.category_name : "N/A";
//   };

//   // Add book handlers
//   const handleOpenAdd = () => {
//     setNewBook({ name: "", author: "", publisher: "", category_id: "", copies: "" });
//     setOpenAddDialog(true);
//   };

//   const handleCloseAdd = () => {
//     setOpenAddDialog(false);
//   };

//   const handleAddBook = async () => {
//     if (!newBook.name.trim()) {
//       showAlert("Validation Error", "Book name is required");
//       return;
//     }
//     if (!newBook.category_id) {
//       showAlert("Validation Error", "Category is required");
//       return;
//     }
//     if (newBook.copies === "" || parseInt(newBook.copies) < 0 || isNaN(parseInt(newBook.copies))) {
//       showAlert("Validation Error", "Valid number of copies is required");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/addbooks", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           book_name: newBook.name.trim(),
//           book_author: newBook.author.trim(),
//           book_publisher: newBook.publisher.trim(),
//           book_category_id: parseInt(newBook.category_id),
//           book_copies: parseInt(newBook.copies),
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`Failed to add book: ${errorData.error || response.statusText}`);
//       }

//       const addedBook = await response.json();
//       setBooks((prev) => [...prev, addedBook]);
//       setNewBook({ name: "", author: "", publisher: "", category_id: "", copies: "" });
//       handleCloseAdd();
//       showAlert("Success", "Book added successfully!");
//     } catch (error) {
//       showAlert("Error", "Error adding book: " + error.message);
//     }
//   };

//   // Edit book handlers
//   const handleEdit = (book) => {
//     setEditingBook({
//       id: book.book_id,
//       name: book.book_name,
//       author: book.book_author,
//       publisher: book.book_publisher,
//       category_id: book.book_category_id,
//       copies: book.book_copies,
//     });
//     setOpenEditDialog(true);
//   };

//   const handleCloseEdit = () => {
//     setOpenEditDialog(false);
//     setEditingBook(null);
//   };

//   const handleUpdateBook = async () => {
//     const { id, name, author, publisher, category_id, copies } = editingBook;

//     if (!name.trim()) {
//       showAlert("Validation Error", "Book name is required");
//       return;
//     }
//     if (!author.trim()) {
//       showAlert("Validation Error", "Book author is required");
//       return;
//     }
//     if (!publisher.trim()) {
//       showAlert("Validation Error", "Book publisher is required");
//       return;
//     }
//     if (!category_id) {
//       showAlert("Validation Error", "Book category is required");
//       return;
//     }
//     if (copies === "" || parseInt(copies) < 0 || isNaN(parseInt(copies))) {
//       showAlert("Validation Error", "Valid number of copies is required");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:5000/editbook/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           book_name: name.trim(),
//           book_author: author.trim(),
//           book_publisher: publisher.trim(),
//           book_category_id: parseInt(category_id),
//           book_copies: parseInt(copies),
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`Failed to update book: ${errorData.error || response.statusText}`);
//       }

//       const updatedBook = await response.json();
//       setBooks((prev) =>
//         prev.map((book) => (book.book_id === id ? updatedBook : book))
//       );

//       showAlert("Success", "Book updated successfully!");
//       handleCloseEdit();
//     } catch (error) {
//       showAlert("Error", "Error updating book: " + error.message);
//     }
//   };

//   // Delete book handler
//   const handleDelete = (id) => {
//     showConfirm(
//       "Confirm Deletion",
//       "Are you sure you want to delete this book?",
//       async () => {
//         try {
//           const response = await fetch(`http://localhost:5000/deletebook/${id}`, {
//             method: "DELETE",
//           });

//           if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(`Failed to delete book: ${errorData.error || response.statusText}`);
//           }

//           setBooks(books.filter((book) => book.book_id !== id));
//           showAlert("Success", "Book deleted successfully!");
//         } catch (error) {
//           showAlert("Error", "Error deleting book: " + error.message);
//         }
//       }
//     );
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   // Filter books based on search term
//   const filteredBooks = books.filter((book) => {
//     const categoryName = getCategoryNameById(book.book_category_id);
//     return (
//       `${book.book_name || ""} ${book.book_author || ""} ${categoryName || ""}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );
//   });

//   const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
//   const paginatedBooks = filteredBooks.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // Display loading or error messages
//   if (error) {
//     return (
//       <Box sx={{ p: 3, ml: 50, mr: 20, mt: 10 }}>
//         <Typography variant="h6" color="error">
//           Error: {error}. Please ensure your backend server is running and accessible at `http://localhost:5000`.
//         </Typography>
//       </Box>
//     );
//   }

//   if (loading) {
//     return (
//       <Box sx={{ p: 3, ml: 50, mr: 20, mt: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
//         <CircularProgress />
//         <Typography sx={{ mt: 2 }}>Loading books and categories...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <>
//       <SidebarSection />
//       <Box sx={{ p: 3, ml: 50, mr: 20, mt: 10 }}>
//         <Typography variant="h4" sx={{ mb: 3 }} fontWeight="bold">Books</Typography>

//         {/* Search and Add Button */}
//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//           <TextField
//             placeholder="Search by Book Name, Author, or Category"
//             variant="outlined"
//             value={searchTerm}
//             onChange={handleSearch}
//             sx={{ width: 400 }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Button variant="contained" onClick={handleOpenAdd} sx={{ backgroundColor: "#6e2ca3" }}>
//             Add Book
//           </Button>
//         </Box>

//         {/* Table */}
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead sx={{ bgcolor: "#6e2ca3" }}>
//               <TableRow>
//                 <TableCell sx={{ color: "white" }}>Book Name</TableCell>
//                 <TableCell sx={{ color: "white" }}>Author</TableCell>
//                 <TableCell sx={{ color: "white" }}>Publisher</TableCell>
//                 <TableCell sx={{ color: "white" }}>Category</TableCell>
//                 <TableCell sx={{ color: "white" }}>Copies</TableCell>
//                 <TableCell sx={{ color: "white" }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedBooks.map((book) => (
//                 <TableRow key={book.book_id}>
//                   <TableCell>{book.book_name}</TableCell>
//                   <TableCell>{book.book_author}</TableCell>
//                   <TableCell>{book.book_publisher}</TableCell>
//                   <TableCell>
//                     {getCategoryNameById(book.book_category_id)}
//                   </TableCell>
//                   <TableCell>
//                     {book.book_copies}
//                   </TableCell>
//                   <TableCell>
//                     <IconButton color="primary" onClick={() => handleEdit(book)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton color="error" onClick={() => handleDelete(book.book_id)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               {paginatedBooks.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">No books found.</TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
//             <Pagination
//               count={totalPages}
//               page={currentPage}
//               onChange={(e, value) => setCurrentPage(value)}
//             />
//           </Stack>
//         )}

//         {/* Add Book Dialog */}
//         <Dialog open={openAddDialog} onClose={handleCloseAdd} maxWidth="md" fullWidth>
//           <DialogTitle>Add New Book</DialogTitle>
//           <Divider sx={{ mb: 2 }} />
//           <DialogContent>
//             <Box sx={{ display: "flex", gap: 4 }}>
//               <Box>
//                  <img src={image} alt="book" style={{ width: 420, height: 400, objectFit: "cover", borderRadius: 8 }} />
//                </Box>
//               <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
//                 <TextField label="Book Name" value={newBook.name} onChange={(e) => setNewBook({ ...newBook, name: e.target.value })} required />
//                 <TextField label="Author" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} />
//                 <TextField label="Publisher" value={newBook.publisher} onChange={(e) => setNewBook({ ...newBook, publisher: e.target.value })} />
//                 <TextField
//                   select
//                   label="Category"
//                   value={newBook.category_id}
//                   onChange={(e) => setNewBook({ ...newBook, category_id: e.target.value })}
//                   required
//                   fullWidth
//                 >
//                   <MenuItem value="">
//                     <em>Select Category</em>
//                   </MenuItem>
//                   {categories.map((category) => (
//                     <MenuItem key={category.category_id} value={category.category_id}>
//                       {category.category_name}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//                 <TextField label="Copies" type="number" value={newBook.copies} onChange={(e) => setNewBook({ ...newBook, copies: e.target.value })} required />
//               </Box>
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseAdd} color="secondary">Cancel</Button>
//             <Button onClick={handleAddBook} variant="contained" sx={{ backgroundColor: "#6e2ca3" }}>
//               Save
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Edit Book Dialog */}
//         <Dialog open={openEditDialog} onClose={handleCloseEdit} maxWidth="md" fullWidth>
//           <DialogTitle>Edit Book</DialogTitle>
//           <Divider sx={{ mb: 2 }} />
//           <DialogContent>
//             <Box sx={{ display: "flex", gap: 4 }}>
//               <Box>
//                  <img src={image} alt="book" style={{ width: 420, height: 400, objectFit: "cover", borderRadius: 8 }} />
//                </Box>
//               <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
//                 <TextField label="Book Name" value={editingBook?.name || ""} onChange={(e) => setEditingBook({ ...editingBook, name: e.target.value })} required />
//                 <TextField label="Author" value={editingBook?.author || ""} onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })} />
//                 <TextField label="Publisher" value={editingBook?.publisher || ""} onChange={(e) => setEditingBook({ ...editingBook, publisher: e.target.value })} />
//                 <TextField
//                   select
//                   label="Category"
//                   value={editingBook?.category_id || ""}
//                   onChange={(e) => setEditingBook({ ...editingBook, category_id: e.target.value })}
//                   required
//                   fullWidth
//                 >
//                   <MenuItem value="">
//                     <em>Select Category</em>
//                   </MenuItem>
//                   {categories.map((category) => (
//                     <MenuItem key={category.category_id} value={category.category_id}>
//                       {category.category_name}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//                 <TextField label="Copies" type="number" value={editingBook?.copies || ""} onChange={(e) => setEditingBook({ ...editingBook, copies: e.target.value })} required />
//               </Box>
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseEdit} color="secondary">Cancel</Button>
//             <Button onClick={handleUpdateBook} variant="contained" sx={{ backgroundColor: "#6e2ca3" }}>
//               Update
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Custom Alert Dialog */}
//         <Dialog open={openAlertDialog} onClose={() => setOpenAlertDialog(false)}>
//           <DialogTitle>{alertTitle}</DialogTitle>
//           <DialogContent>
//             <Typography>{alertMessage}</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenAlertDialog(false)} autoFocus>
//               Ok
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Custom Confirm Dialog */}
//         <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
//           <DialogTitle>{confirmTitle}</DialogTitle>
//           <DialogContent>
//             <Typography>{confirmMessage}</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenConfirmDialog(false)} color="secondary">
//               No
//             </Button>
//             <Button
//               onClick={() => {
//                 confirmAction && confirmAction();
//                 setOpenConfirmDialog(false);
//               }}
//               variant="contained"
//               sx={{ backgroundColor: "#6e2ca3" }}
//               autoFocus
//             >
//               Yes
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </>
//   );
// };



import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Pagination,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Typography,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import image from "../images/category.jpg";
import { SidebarSection } from "./SidebarSection";

export const BookSection = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newBook, setNewBook] = useState({ name: "", author: "", publisher: "", category_id: "", copies: "" });
  const [editingBook, setEditingBook] = useState(null);
  const [categories, setCategories] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [booksResponse, categoriesResponse] = await Promise.all([
          fetch(`http://localhost:5000/books`),
          fetch(`http://localhost:5000/categories`),
        ]);

        if (!booksResponse.ok) throw new Error(`Failed to fetch books data`);
        if (!categoriesResponse.ok) throw new Error(`Failed to fetch categories data`);

        const booksData = await booksResponse.json();
        const categoriesData = await categoriesResponse.json();

        setCategories(categoriesData);
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCategoryNameById = (categoryId) => {
    const category = categories.find((cat) => parseInt(cat.category_id) === parseInt(categoryId));
    return category ? category.category_name : "N/A";
  };

  const handleOpenAdd = () => {
    setNewBook({ name: "", author: "", publisher: "", category_id: "", copies: "" });
    setOpenAddDialog(true);
  };

  const handleCloseAdd = () => {
    setOpenAddDialog(false);
  };

  //add
  const handleAddBook = async () => {
    try {
      const response = await fetch("http://localhost:5000/addbooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book_name: newBook.name.trim(),
          book_author: newBook.author.trim(),
          book_publisher: newBook.publisher.trim(),
          book_category_id: parseInt(newBook.category_id),
          book_copies: parseInt(newBook.copies),
        }),
      });

      if (!response.ok) return;
      const addedBook = await response.json();
      setBooks((prev) => [...prev, addedBook]);
      setNewBook({ name: "", author: "", publisher: "", category_id: "", copies: "" });
      handleCloseAdd();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  //edit
  const handleEdit = (book) => {
    setEditingBook({
      id: book.book_id,
      name: book.book_name,
      author: book.book_author,
      publisher: book.book_publisher,
      category_id: book.book_category_id,
      copies: book.book_copies,
    });
    setOpenEditDialog(true);
  };

  const handleCloseEdit = () => {
    setOpenEditDialog(false);
    setEditingBook(null);
  };

  const handleUpdateBook = async () => {
    const { id, name, author, publisher, category_id, copies } = editingBook;
    try {
      const response = await fetch(`http://localhost:5000/editbook/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book_name: name.trim(),
          book_author: author.trim(),
          book_publisher: publisher.trim(),
          book_category_id: parseInt(category_id),
          book_copies: parseInt(copies),
        }),
      });

      if (!response.ok) return;
      const updatedBook = await response.json();
      setBooks((prev) => prev.map((book) => (book.book_id === id ? updatedBook : book)));
      handleCloseEdit();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };


  //delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/deletebook/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) return;
      setBooks(books.filter((book) => book.book_id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredBooks = books.filter((book) => {
    const categoryName = getCategoryNameById(book.book_category_id);
    return (
      `${book.book_name || ""} ${book.book_author || ""} ${categoryName || ""}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage);


  return (
    <>
      <SidebarSection />
      <Box sx={{ p: 3, ml: 50, mr: 20, mt: 10 }}>
        <Typography variant="h4" sx={{ mb: 3 }} fontWeight="bold">Books</Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <TextField
            placeholder="Search by Book Name, Author, or Category"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ width: 400 }}
            InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
          />
          <Button variant="contained" onClick={handleOpenAdd} sx={{ backgroundColor: "#6e2ca3" }}>
            Add Book
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#6e2ca3" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Book Name</TableCell>
                <TableCell sx={{ color: "white" }}>Author</TableCell>
                <TableCell sx={{ color: "white" }}>Publisher</TableCell>
                <TableCell sx={{ color: "white" }}>Category</TableCell>
                <TableCell sx={{ color: "white" }}>Copies</TableCell>
                <TableCell sx={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedBooks.map((book) => (
                <TableRow key={book.book_id}>
                  <TableCell>{book.book_name}</TableCell>
                  <TableCell>{book.book_author}</TableCell>
                  <TableCell>{book.book_publisher}</TableCell>
                  <TableCell>{getCategoryNameById(book.book_category_id)}</TableCell>
                  <TableCell>{book.book_copies}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(book)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(book.book_id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedBooks.length === 0 && (
                <TableRow><TableCell colSpan={6} align="center">No books found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {totalPages > 1 && (
          <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
            <Pagination count={totalPages} page={currentPage} onChange={(e, value) => setCurrentPage(value)} />
          </Stack>
        )}

        <Dialog open={openAddDialog} onClose={handleCloseAdd} maxWidth="md" fullWidth>
          <DialogTitle>Add New Book</DialogTitle>
          <Divider sx={{ mb: 2 }} />
          <DialogContent>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Box><img src={image} alt="book" style={{ width: 420, height: 400, objectFit: "cover", borderRadius: 8 }} /></Box>
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Book Name" value={newBook.name} onChange={(e) => setNewBook({ ...newBook, name: e.target.value })} required />
                <TextField label="Author" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} />
                <TextField label="Publisher" value={newBook.publisher} onChange={(e) => setNewBook({ ...newBook, publisher: e.target.value })} />
                <TextField select label="Category" value={newBook.category_id} onChange={(e) => setNewBook({ ...newBook, category_id: e.target.value })} required fullWidth>
                  <MenuItem value=""><em>Select Category</em></MenuItem>
                  {categories.map((category) => (<MenuItem key={category.category_id} value={category.category_id}>{category.category_name}</MenuItem>))}
                </TextField>
                <TextField label="Copies" type="number" value={newBook.copies} onChange={(e) => setNewBook({ ...newBook, copies: e.target.value })} required />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd} color="secondary">Cancel</Button>
            <Button onClick={handleAddBook} variant="contained" sx={{ backgroundColor: "#6e2ca3" }}>Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEditDialog} onClose={handleCloseEdit} maxWidth="md" fullWidth>
          <DialogTitle>Edit Book</DialogTitle>
          <Divider sx={{ mb: 2 }} />
          <DialogContent>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Box><img src={image} alt="book" style={{ width: 420, height: 400, objectFit: "cover", borderRadius: 8 }} /></Box>
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Book Name" value={editingBook?.name || ""} onChange={(e) => setEditingBook({ ...editingBook, name: e.target.value })} required />
                <TextField label="Author" value={editingBook?.author || ""} onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })} />
                <TextField label="Publisher" value={editingBook?.publisher || ""} onChange={(e) => setEditingBook({ ...editingBook, publisher: e.target.value })} />
                <TextField select label="Category" value={editingBook?.category_id || ""} onChange={(e) => setEditingBook({ ...editingBook, category_id: e.target.value })} required fullWidth>
                  <MenuItem value=""><em>Select Category</em></MenuItem>
                  {categories.map((category) => (<MenuItem key={category.category_id} value={category.category_id}>{category.category_name}</MenuItem>))}
                </TextField>
                <TextField label="Copies" type="number" value={editingBook?.copies || ""} onChange={(e) => setEditingBook({ ...editingBook, copies: e.target.value })} required />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit} color="secondary">Cancel</Button>
            <Button onClick={handleUpdateBook} variant="contained" sx={{ backgroundColor: "#6e2ca3" }}>Update</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
