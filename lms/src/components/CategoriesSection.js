// import React, { useState, useEffect, forwardRef } from "react";
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
//   Pagination,
//   Stack,
//   IconButton,
//   InputAdornment,
//   Divider,
//   DialogTitle,
//   DialogActions,
//   Dialog,
//   Typography,
//   // MenuItem, // Removed: 'MenuItem' is defined but never used in CategoriesSection
//   CircularProgress, // Import CircularProgress for loading indicator
//   DialogContent, // Added: 'DialogContent' was not defined
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import image from "../images/category.jpg";
// import img from "../images/category1.avif";
// import { SidebarSection } from "./SidebarSection";


// export const CategoriesSection = forwardRef(() => { // Using forwardRef
//   const [newCategory, setNewCategory] = useState({ name: "", description: "", totalBooks: "", status: "" });
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [categories, setCategories] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true); // Added loading state

//   // States for custom alert/confirm dialogs
//   // const [openAlertDialog, setOpenAlertDialog] = useState(false);
//   // const [alertMessage, setAlertMessage] = useState("");
//   // const [alertTitle, setAlertTitle] = useState("");

//   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
//   const [confirmMessage, setConfirmMessage] = useState("");
//   const [confirmAction, setConfirmAction] = useState(null);
//   const [confirmTitle, setConfirmTitle] = useState("");

//   const itemsPerPage = 5;

//   // Function to show custom alert dialog
//   // const showAlert = (title, message) => {
//   //   setAlertTitle(title);
//   //   setAlertMessage(message);
//   //   setOpenAlertDialog(true);
//   // };

//   // Function to show custom confirmation dialog
//   const showConfirm = (title, message, action) => {
//     setConfirmTitle(title);
//     setConfirmMessage(message);
//     setConfirmAction(() => action);
//     setOpenConfirmDialog(true);
//   };


//  useEffect(() => {
//   const fetchCategories = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch("http://localhost:5000/categories");
//       if (!response.ok) {
//         throw new Error(`Failed to fetch categories data: ${response.statusText}`);
//       }
//       const data = await response.json();
//       setCategories(data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       setError(error.message);
//     } 
//   };
//     fetchCategories();
//   }, []); 


//   const handleOpen = () => setOpenDialog(true);
//   const handleClose = () => {
//     setOpenDialog(false);
//     setNewCategory({ name: "", description: "", totalBooks: "", status: "" });
//   };

//   const handleAddCategory = async () => {
//     if (!newCategory.name.trim()) {
//       showAlert("Validation Error", "Category name is required");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/addcategories", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           category_name: newCategory.name.trim(),
//           category_description: newCategory.description.trim(),
//           category_total_books: parseInt(newCategory.totalBooks) || 0,
//           category_status: "Active",
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`Failed to add category: ${errorData.error || response.statusText}`);
//       }

//       const addedCategory = await response.json();
//       setCategories((prev) => [...prev, addedCategory]);
//       handleClose();
//       showAlert("Success", "Category added successfully!");
//     } catch (error) {
//       showAlert("Error", "Error adding category: " + error.message);
//     }
//   };

//   const handleEditOpen = (category) => {
//     setEditingCategory({
//       id: category.category_id,
//       name: category.category_name,
//       description: category.category_description,
//       totalBooks: category.category_total_books,
//       status: category.category_status,
//     });
//     setOpenEditDialog(true);
//   };

//   const handleEditClose = () => {
//     setOpenEditDialog(false);
//     setEditingCategory(null);
//   };

//   const handleUpdateCategory = async () => {
//     const { id, name, description, totalBooks, status } = editingCategory;

//     if (!name.trim()) {
//       showAlert("Validation Error", "Category name is required");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:5000/editcategory/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           category_name: name.trim(),
//           category_description: description.trim(),
//           category_total_books: parseInt(totalBooks) || 0,
//           category_status: status.trim(),
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`Failed to update category: ${errorData.error || response.statusText}`);
//       }

//       const updatedCategoryResponse = await response.json();
//       setCategories((prev) =>
//         prev.map((cat) => (cat.category_id === id ? updatedCategoryResponse.updatedCategory : cat))
//       );

//       showAlert("Success", "Category updated successfully");
//       handleEditClose();
//     } catch (error) {
//       showAlert("Error", "Error updating category: " + error.message);
//     }
//   };

//   const handleDelete = (id) => {
//     showConfirm(
//       "Confirm Deletion",
//       "Are you sure you want to delete this category? This will not affect books associated with this category.",
//       async () => {
//         try {
//           const response = await fetch(`http://localhost:5000/deletecategory/${id}`, {
//             method: "DELETE",
//           });

//           if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(`Failed to delete category: ${errorData.error || response.statusText}`);
//           }

//           setCategories(categories.filter((cat) => cat.category_id !== id));
//           showAlert("Success", "Category deleted successfully");
//         } catch (error) {
//           showAlert("Error", "Error deleting category: " + error.message);
//         }
//       }
//     );
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   const filteredCategories = categories.filter((cat) =>
//     (cat?.category_name || "").toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
//   const paginatedCategories = filteredCategories.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );


//   return (
//     <>
//       <SidebarSection />
//       <Box sx={{ p: 3, ml: 50, mr: 20, mt: 10 }}>
//         <Typography variant="h4" sx={{ mb: 4 }} fontWeight="bold">
//           Categories
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//           <TextField
//             placeholder="Search by Categories"
//             value={searchTerm}
//             onChange={handleSearch}
//             variant="outlined"
//             sx={{ width: 400 }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Button variant="contained" sx={{ backgroundColor: "#6e2ca3" }} onClick={handleOpen}>
//             Add Category
//           </Button>
//         </Box>

//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ bgcolor: "#6e2ca3" }}>
//                 <TableCell sx={{ color: "white" }}>Category Name</TableCell>
//                 <TableCell sx={{ color: "white" }}>Description</TableCell>
//                 <TableCell sx={{ color: "white" }}>Category wise Total Books</TableCell>
//                 <TableCell sx={{ color: "white" }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedCategories.map((cat) => (
//                 <TableRow key={cat.category_id}>
//                   <TableCell>{cat.category_name}</TableCell>
//                   <TableCell>{cat.category_description}</TableCell>
//                   <TableCell>{cat.category_total_books}</TableCell>
//                   <TableCell>
//                     <IconButton color="primary" onClick={() => handleEditOpen(cat)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton color="error" onClick={() => handleDelete(cat.category_id)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               {paginatedCategories.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     No categories found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {totalPages > 1 && (
//           <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
//             <Pagination count={totalPages} page={currentPage} onChange={(e, val) => setCurrentPage(val)} />
//           </Stack>
//         )}

//         {/* Add Dialog */}
//         <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
//           <DialogTitle>Add New Category</DialogTitle>
//           <Divider sx={{ mb: 2 }} />
//           <Box sx={{ display: "flex", gap: 4, p: 3 }}>
//             <Box>
//               <img src={image} alt="Category" style={{ width: 420, height: 400, objectFit: "cover", borderRadius: 8 }} />
//             </Box>
//             <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, mt: 6 }}>
//               <TextField label="Category Name" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} required />
//               <TextField label="Description" value={newCategory.description} onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} multiline rows={3} />
//             </Box>
//           </Box>
//           <DialogActions>
//             <Button onClick={handleClose} color="secondary">Cancel</Button>
//             <Button onClick={handleAddCategory} variant="contained" sx={{ backgroundColor: "#6e2ca3" }}>Save</Button>
//           </DialogActions>
//         </Dialog>

//         {/* Edit Dialog */}
//         <Dialog open={openEditDialog} onClose={handleEditClose} maxWidth="md" fullWidth>
//           <DialogTitle>Edit Category</DialogTitle>
//           <Divider sx={{ mb: 2 }} />
//           <Box sx={{ display: "flex", gap: 4, p: 3 }}>
//             <Box>
//               <img src={img} alt="Category" style={{ width: 420, height: 400, objectFit: "cover", borderRadius: 8 }} />
//             </Box>
//             <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, mt: 6 }}>
//               <TextField label="Category Name" value={editingCategory?.name || ""} onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })} required />
//               <TextField label="Description" value={editingCategory?.description || ""} onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })} multiline rows={3} />
//             </Box>
//           </Box>
//           <DialogActions>
//             <Button onClick={handleEditClose} color="secondary">Cancel</Button>
//             <Button onClick={handleUpdateCategory} variant="contained" sx={{ backgroundColor: "#6e2ca3" }}>Update</Button>
//           </DialogActions>
//         </Dialog>

   

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
// });


import React, { useState, useEffect,  } from "react";
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
  Pagination,
  Stack,
  IconButton,
  InputAdornment,
  Divider,
  DialogTitle,
  DialogActions,
  Dialog,
  Typography,
  DialogContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import image from "../images/category.jpg";
import img from "../images/category1.avif";
import { SidebarSection } from "./SidebarSection";

export const CategoriesSection = () => {
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      
      try {
        const response = await fetch("http://localhost:5000/categories");
        if (!response.ok) {
          throw new Error(`Failed to fetch categories data`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => {
    setOpenDialog(false);
    setNewCategory({ name: "", description: "" });
  };

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/addcategories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_name: newCategory.name.trim(),
          category_description: newCategory.description.trim(),
          category_total_books: parseInt(newCategory.totalBooks) || 0,
          
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add categories data`);
      }

      const addedCategory = await response.json();
      setCategories((prev) => [...prev, addedCategory]);
      handleClose();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleEditOpen = (category) => {
    setEditingCategory({
      id: category.category_id,
      name: category.category_name,
      description: category.category_description,
      totalBooks: category.category_total_books,
     
    });
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setEditingCategory(null);
  };

  const handleUpdateCategory = async () => {
    const { id, name, description, totalBooks, } = editingCategory;
    if (!name.trim()) return;

    try {
      const response = await fetch(`http://localhost:5000/editcategory/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_name: name.trim(),
          category_description: description.trim(),
          category_total_books: parseInt(totalBooks) || 0,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to edit categories data`);
      }

      const updatedCategoryResponse = await response.json();
      setCategories((prev) =>
        prev.map((cat) => (cat.category_id === id ? updatedCategoryResponse.updatedCategory : cat))
      );
      handleEditClose();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = (id) => {
    const deleteCategory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/deletecategory/${id}`, 
          { 
            method: "DELETE" 
          });
        if (!response.ok) return;
        setCategories(categories.filter((cat) => cat.category_id !== id));
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    };
    deleteCategory();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredCategories = categories.filter((cat) =>
    (cat?.category_name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <SidebarSection />
      <Box sx={{ p: 3, ml: 50, mr: 20, mt: 10 }}>
        <Typography variant="h4" sx={{ mb: 4 }} fontWeight="bold">
          Categories
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <TextField
            placeholder="Search by Categories"
            value={searchTerm}
            onChange={handleSearch}
            variant="outlined"
            sx={{ width: 400 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" sx={{ backgroundColor: "#6e2ca3" }} onClick={handleOpen}>
            Add Category
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#6e2ca3" }}>
                <TableCell sx={{ color: "white" }}>Category Name</TableCell>
                <TableCell sx={{ color: "white" }}>Description</TableCell>
                <TableCell sx={{ color: "white" }}>Category wise Total Books</TableCell>
                <TableCell sx={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCategories.map((cat) => (
                <TableRow key={cat.category_id}>
                  <TableCell>{cat.category_name}</TableCell>
                  <TableCell>{cat.category_description}</TableCell>
                  <TableCell>{cat.category_total_books}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditOpen(cat)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(cat.category_id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedCategories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {totalPages > 1 && (
          <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
            <Pagination count={totalPages} page={currentPage} onChange={(e, val) => setCurrentPage(val)} />
          </Stack>
        )}

        {/* Add Dialog */}
        <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>Add New Category</DialogTitle>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", gap: 4, p: 3 }}>
            <Box>
              <img src={image} alt="Category" style={{ width: 420, height: 400, objectFit: "cover", borderRadius: 8 }} />
            </Box>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, mt: 6 }}>
              <TextField label="Category Name" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} required />
              <TextField label="Description" value={newCategory.description} onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} multiline rows={3} />
            </Box>
          </Box>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">Cancel</Button>
            <Button onClick={handleAddCategory} variant="contained" sx={{ backgroundColor: "#6e2ca3" }}>Save</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onClose={handleEditClose} maxWidth="md" fullWidth>
          <DialogTitle>Edit Category</DialogTitle>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", gap: 4, p: 3 }}>
            <Box>
              <img src={img} alt="Category" style={{ width: 420, height: 400, objectFit: "cover", borderRadius: 8 }} />
            </Box>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, mt: 6 }}>
              <TextField label="Category Name" value={editingCategory?.name || ""} onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })} required />
              <TextField label="Description" value={editingCategory?.description || ""} onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })} multiline rows={3} />
            </Box>
          </Box>
          <DialogActions>
            <Button onClick={handleEditClose} color="secondary">Cancel</Button>
            <Button onClick={handleUpdateCategory} variant="contained" sx={{ backgroundColor: "#6e2ca3" }}>Update</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
