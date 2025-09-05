// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
//   Grid,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import img from "../images/category1.avif"; // Adjust path to your image

// const initialStudents = Array.from({ length: 20 }, (_, i) => ({
//   id: i + 1,
//   name: `Student ${i + 1}`,
//   email: `student${i + 1}@example.com`,
//   phone: `98765${String(10000 + i).slice(-5)}`,
//   year: `${(i % 4) + 1} Year`,
//   startDate: `2023-0${(i % 9) + 1}-01`,
// }));

// export const StudentMembership= () => {
//   const [students, setStudents] = useState(initialStudents);
//   const [isAddOpen, setAddOpen] = useState(false);
//   const [isEditOpen, setEditOpen] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     year: "",
//     startDate: "",
//   });

//   const handleInputChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleAddOpen = () => {
//     setFormData({ name: "", email: "", phone: "", year: "", startDate: "" });
//     setAddOpen(true);
//   };

//   const handleAddStudent = () => {
//     setStudents([
//       ...students,
//       { ...formData, id: students.length + 1 },
//     ]);
//     setAddOpen(false);
//   };

//   const handleEditOpen = (student) => {
//     setSelectedStudent(student);
//     setFormData(student);
//     setEditOpen(true);
//   };

//   const handleEditStudent = () => {
//     setStudents((prev) =>
//       prev.map((s) => (s.id === selectedStudent.id ? formData : s))
//     );
//     setEditOpen(false);
//   };

//   const handleDelete = (id) =>
//     setStudents((prev) => prev.filter((s) => s.id !== id));

//   return (
//     <Box p={3}>
//       <Typography variant="h4" gutterBottom>
//         Student Membership
//       </Typography>

//       <Button variant="contained" onClick={handleAddOpen}>
//         Add New Student Membership
//       </Button>

//       <TableContainer component={Paper} sx={{ mt: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Year</TableCell>
//               <TableCell>Start Date</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {students.map((s) => (
//               <TableRow key={s.id}>
//                 <TableCell>{s.id}</TableCell>
//                 <TableCell>{s.name}</TableCell>
//                 <TableCell>{s.email}</TableCell>
//                 <TableCell>{s.phone}</TableCell>
//                 <TableCell>{s.year}</TableCell>
//                 <TableCell>{s.startDate}</TableCell>
//                 <TableCell align="center">
//                   <IconButton color="primary" onClick={() => handleEditOpen(s)}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton color="error" onClick={() => handleDelete(s.id)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Add Dialog */}
//       <Dialog open={isAddOpen} onClose={() => setAddOpen(false)} maxWidth="md">
//         <DialogTitle>Add Student</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={5}>
//               <Box
//                 component="img"
//                 src={img}
//                 alt="student"
//                 sx={{ width: "100%", height: "100%", objectFit: "cover" }}
//               />
//             </Grid>
//             <Grid item xs={12} md={7}>
//               <TextField
//                 fullWidth
//                 name="name"
//                 label="Name"
//                 margin="dense"
//                 value={formData.name}
//                 onChange={handleInputChange}
//               />
//               <TextField
//                 fullWidth
//                 name="email"
//                 label="Email"
//                 margin="dense"
//                 value={formData.email}
//                 onChange={handleInputChange}
//               />
//               <TextField
//                 fullWidth
//                 name="phone"
//                 label="Phone"
//                 margin="dense"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//               />
//               <TextField
//                 fullWidth
//                 name="year"
//                 label="Year of Study"
//                 margin="dense"
//                 value={formData.year}
//                 onChange={handleInputChange}
//               />
//               <TextField
//                 fullWidth
//                 name="startDate"
//                 type="date"
//                 label="Start Date"
//                 margin="dense"
//                 InputLabelProps={{ shrink: true }}
//                 value={formData.startDate}
//                 onChange={handleInputChange}
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setAddOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleAddStudent}>
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Edit Dialog */}
//       <Dialog open={isEditOpen} onClose={() => setEditOpen(false)}>
//         <DialogTitle>Edit Student</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             name="name"
//             label="Name"
//             margin="dense"
//             value={formData.name}
//             onChange={handleInputChange}
//           />
//           <TextField
//             fullWidth
//             name="email"
//             label="Email"
//             margin="dense"
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//           <TextField
//             fullWidth
//             name="phone"
//             label="Phone"
//             margin="dense"
//             value={formData.phone}
//             onChange={handleInputChange}
//           />
//           <TextField
//             fullWidth
//             name="year"
//             label="Year of Study"
//             margin="dense"
//             value={formData.year}
//             onChange={handleInputChange}
//           />
//           <TextField
//             fullWidth
//             name="startDate"
//             type="date"
//             label="Start Date"
//             margin="dense"
//             InputLabelProps={{ shrink: true }}
//             value={formData.startDate}
//             onChange={handleInputChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setEditOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleEditStudent}>
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };



import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Grid,
  Pagination,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import img from "../images/category1.avif";
import { SidebarSection } from "./SidebarSection";

// const initialStudents = [
//   { id: 1, name: "Aarav Kumar", email: "aarav.kumar@example.com", phone: "9876543210", year: "1st", startDate: "2023-08-01" },
//   { id: 2, name: "Diya Sharma", email: "diya.sharma@example.com", phone: "9876543211", year: "2nd", startDate: "2023-08-05" },
//   { id: 3, name: "Rohan Singh", email: "rohan.singh@example.com", phone: "9876543212", year: "3rd", startDate: "2023-08-10" },
//   { id: 4, name: "Meera Joshi", email: "meera.joshi@example.com", phone: "9876543213", year: "1st", startDate: "2023-09-01" },
//   { id: 5, name: "Aryan Patel", email: "aryan.patel@example.com", phone: "9876543214", year: "4th", startDate: "2023-07-15" },
//   { id: 6, name: "Sneha Reddy", email: "sneha.reddy@example.com", phone: "9876543215", year: "2nd", startDate: "2023-09-10" },
//   { id: 7, name: "Vikram Rao", email: "vikram.rao@example.com", phone: "9876543216", year: "3rd", startDate: "2023-08-20" },
//   { id: 8, name: "Anjali Verma", email: "anjali.verma@example.com", phone: "9876543217", year: "1st", startDate: "2023-08-25" },
//   { id: 9, name: "Karan Mehta", email: "karan.mehta@example.com", phone: "9876543218", year: "2nd", startDate: "2023-07-30" },
//   { id: 10, name: "Pooja Iyer", email: "pooja.iyer@example.com", phone: "9876543219", year: "3rd", startDate: "2023-09-05" },
//   { id: 11, name: "Ritika Jain", email: "ritika.jain@example.com", phone: "9876543220", year: "1st", startDate: "2023-09-08" },
//   { id: 12, name: "Dev Sharma", email: "dev.sharma@example.com", phone: "9876543221", year: "4th", startDate: "2023-07-18" },
//   { id: 13, name: "Tanya Gupta", email: "tanya.gupta@example.com", phone: "9876543222", year: "3rd", startDate: "2023-07-25" },
//   { id: 14, name: "Sahil Kapoor", email: "sahil.kapoor@example.com", phone: "9876543223", year: "2nd", startDate: "2023-08-03" },
//   { id: 15, name: "Isha Nair", email: "isha.nair@example.com", phone: "9876543224", year: "1st", startDate: "2023-09-12" },
//   { id: 16, name: "Arjun Das", email: "arjun.das@example.com", phone: "9876543225", year: "4th", startDate: "2023-07-05" },
//   { id: 17, name: "Nisha Paul", email: "nisha.paul@example.com", phone: "9876543226", year: "3rd", startDate: "2023-08-18" },
//   { id: 18, name: "Rajiv Roy", email: "rajiv.roy@example.com", phone: "9876543227", year: "2nd", startDate: "2023-08-28" },
//   { id: 19, name: "Swati Singh", email: "swati.singh@example.com", phone: "9876543228", year: "1st", startDate: "2023-09-15" },
//   { id: 20, name: "Nikhil Bansal", email: "nikhil.bansal@example.com", phone: "9876543229", year: "4th", startDate: "2023-07-10" },
// ];


export const StudentMembership = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setAddOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    year: "",
    startDate: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const MemberDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/membership`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError(error.message);
      }
    };
    MemberDetails();
  }, []);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddStudent = async () => {
    if (!formData.name.trim()) return alert("Member name is required");

    try {
      const response = await fetch("http://localhost:5000/addmember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          member_name: formData.name.trim(),
          member_email: formData.email.trim(),
          member_phone: formData.phone.trim(),
          member_year: formData.year.trim(),
          member_start_date: new Date(formData.startDate).toISOString().split("T")[0], // e.g., '2023-08-01'
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add member");
      }

      const newMember = await response.json();

      setStudents((prev) => [...prev, newMember]);
      setFormData({
        name: "",
        email: "",
        phone: "",
        year: "",
        startDate: "",
      });
      setAddOpen(false);
    } catch (error) {
      alert("Error adding member: " + error.message);
    }
  };


  //edit
  const handleEditOpen = (s) => {
    setFormData({
      id: s.member_id,
      name: s.member_name,
      email: s.member_email,
      phone: s.member_phone,
      year: s.member_year,
      startDate: s.member_start_date,
    });
    setEditOpen(true);
  };

  const handleEditStudent = async () => {
    const { id, name, email, phone, year, startDate } = formData;

    if (!name.trim()) return alert("Member name is required");
    if (!email.trim()) return alert("Member email is required");
    if (!phone.trim()) return alert("Member phone is required");
    if (!year.trim()) return alert("Member year is required");
    if (!startDate) return alert("Start date is required");

    try {
      const response = await fetch(`http://localhost:5000/editmember/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          member_name: name.trim(),
          member_email: email.trim(),
          member_phone: phone.trim(),
          member_year: year.trim(),
          member_start_date: new Date(startDate).toISOString().split("T")[0],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update member");
      }

      setStudents((prev) =>
        prev.map((student) =>
          student.member_id === id
            ? {
              ...student,
              member_name: name,
              member_email: email,
              member_phone: phone,
              member_year: year,
              member_start_date: startDate,
            }
            : student
        )
      );

      alert("Member updated successfully");
      setEditOpen(false);
    } catch (error) {
      alert("Error updating member: " + error.message);
    }
  };



  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/deletemember/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete member");
      }

      setStudents((prev) => prev.filter((s) => s.member_id !== id));
    } catch (error) {
      alert("Error deleting member: " + error.message);
    }
  };


   const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };


  const filteredStudents = students.filter((student) =>
    `${student.member_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedmembers = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <SidebarSection />
      <Box sx={{ p: 3, ml: 50, mr: 20, mt: 10 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" mb={4}>
          Student Membership
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
          <Button variant="contained" onClick={handleAddOpen} sx={{ backgroundColor: "#6e2ca3" }}>
            Add New Student Membership
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#6e2ca3" }}>
              <TableRow>
                {/* <TableCell sx={{ color: "white" }}>ID</TableCell> */}
                <TableCell sx={{ color: "white" }}>Name</TableCell>
                <TableCell sx={{ color: "white" }}>Email</TableCell>
                <TableCell sx={{ color: "white" }}>Phone</TableCell>
                <TableCell sx={{ color: "white" }}>Year</TableCell>
                <TableCell sx={{ color: "white" }}>Membership Start Date</TableCell>
                <TableCell sx={{ color: "white" }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedmembers.map((student) => (
                <TableRow key={student.member_id}>
                  {/* <TableCell>{student.member_id}</TableCell> */}
                  <TableCell>{student.member_name}</TableCell>
                  <TableCell>{student.member_email}</TableCell>
                  <TableCell>{student.member_phone}</TableCell>
                  <TableCell>{student.member_year}</TableCell>
                  <TableCell>{student.member_start_date}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleEditOpen(student)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(student.member_id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedmembers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">No books found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {totalPages > 1 && (
          <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, value) => setCurrentPage(value)}
            />
          </Stack>
        )}

        {/* Add Dialog */}
        <Dialog open={isAddOpen} onClose={() => setAddOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Add Student</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <Box>
                  <img src={img} alt="book" style={{ width: 420, height: 400, objectFit: "cover", borderRadius: 8 }} />
                </Box>
              </Grid>
              <Grid item xs={12} md={7} sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField fullWidth name="name" label="Name" margin="dense" value={formData.name} onChange={handleInputChange} />
                <TextField fullWidth name="email" label="Email" margin="dense" value={formData.email} onChange={handleInputChange} />
                <TextField fullWidth name="phone" label="Phone" margin="dense" value={formData.phone} onChange={handleInputChange} />
                <TextField fullWidth name="year" label="Year of Study" margin="dense" value={formData.year} onChange={handleInputChange} />
                <TextField fullWidth name="startDate" type="date" label="Start Date" margin="dense" InputLabelProps={{ shrink: true }} value={formData.startDate} onChange={handleInputChange} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAddStudent}>Add</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onClose={() => setEditOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <Box>
                  <img src={img} alt="book" style={{ width: 420, height: 400, objectFit: "cover", borderRadius: 8 }} />
                </Box>
              </Grid>
              <Grid item xs={12} md={7} sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField fullWidth name="name" label="Name" margin="dense" value={formData.name} onChange={handleInputChange} />
                <TextField fullWidth name="email" label="Email" margin="dense" value={formData.email} onChange={handleInputChange} />
                <TextField fullWidth name="phone" label="Phone" margin="dense" value={formData.phone} onChange={handleInputChange} />
                <TextField fullWidth name="year" label="Year of Study" margin="dense" value={formData.year} onChange={handleInputChange} />
                <TextField fullWidth name="startDate" type="date" label="Start Date" margin="dense" InputLabelProps={{ shrink: true }} value={formData.startDate} onChange={handleInputChange} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleEditStudent}>Update</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};



