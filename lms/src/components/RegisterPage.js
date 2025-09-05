// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Link,
//   Paper,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   Checkbox,
//   IconButton, InputAdornment
// } from "@mui/material";
// import image from "../images/register-img.png";
// import { useNavigate } from "react-router-dom";
// import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// export const RegisterPage = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [department, setDepartment] = useState("");
//   const [year, setYear] = useState("");
//   const [role, setRole] = useState("student");
//   const [remember, setRemember] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseDownPassword = (e) => e.preventDefault();

//   const navigate = useNavigate();

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   const formData = {
//   //     name,
//   //     email,
//   //     password,
//   //     department,
//   //     year,
//   //     role,
//   //     remember,
//   //   };

//   //   console.log("Form Data:", formData);
//   //   navigate("/sign");
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (role === "admin") {
//         const response = await fetch("http://localhost:5000/admin", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             admin_name: name,
//             admin_email: email,
//             password: password,
//           }),
//         });

//         const data = await response.json();
//         if (!response.ok) {
//           alert(data.message || "Registration failed");
//           return;
//         }
//         alert("Admin registered successfully");
//       } else {

//         // student role
//         const response = await fetch("http://localhost:5000/student", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             student_name: name,
//             student_email: email,
//             password: password,
//             department: department,
//             year: year,
//           }),
//         });

//         const data = await response.json();
//         if (!response.ok) {
//           alert(data.message || "Registration failed");
//           return;
//         }

//         alert("Student registered successfully");
//       }

//       navigate("/");
//     } catch (error) {
//       console.error("Registration error:", error);
//       alert("An error occurred. Please try again later.");
//     }
//   };


//   return (
//     <Box
//       sx={{
//         minHeight: "86vh",
//         backgroundColor: "#e9e0f6",
//         display: "flex",
//         paddingLeft: 45,
//         paddingTop: 7,
//         paddingBottom: 7,
//       }}
//     >
//       <Paper
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           borderRadius: 4,
//           overflow: "hidden",
//           maxWidth: 1000,
//         }}
//       >
//         {/* Left: Image */}
//         <Box
//           sx={{
//             flex: 1,
//             backgroundColor: "#fff",
//             display: "flex",
//             justifyContent: "flex-start",
//             alignItems: "center",
//             p: 2,
//           }}
//         >
//           <Box
//             component="img"
//             src={image}
//             alt="Library register"
//             sx={{
//               width: 400,
//               maxWidth: 600,
//               height: 600,
//               objectFit: "cover",
//               borderRadius: 2,
//             }}
//           />
//         </Box>

//         {/* Right: Register Form */}
//         <Box
//           sx={{
//             p: { xs: 3, md: 5 },
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             color: "white",
//             height: 600,
//             width: 450,
//           }}
//         >
//           <Typography
//             variant="h5"
//             fontWeight="bold"
//             align="center"
//             mb={2}
//             sx={{ color: "black" }}
//           >
//             {role === "student" ? "Student Register" : "Admin Register"}
//           </Typography>

//           <form onSubmit={handleSubmit}>
//             {/* Common Fields */}
//             <TextField
//               margin="normal"
//               fullWidth
//               label="Full Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />

//             <TextField
//               margin="normal"
//               fullWidth
//               label="Email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <TextField
//               margin="normal"
//               fullWidth
//               label="Password"
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />


//             {/* Student Specific Fields */}
//             {role === "student" && (
//               <>
//                 <TextField
//                   margin="normal"
//                   fullWidth
//                   label="Department"
//                   value={department}
//                   onChange={(e) => setDepartment(e.target.value)}
//                 />

//                 <TextField
//                   margin="normal"
//                   fullWidth
//                   label="Year"
//                   value={year}
//                   onChange={(e) => setYear(e.target.value)}
//                 />
//               </>
//             )}

//             {/* Remember Me */}
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 mt: 2,
//               }}
//             >
//               <FormControl>
//                 <RadioGroup
//                   row
//                   value={role}
//                   onChange={(e) => setRole(e.target.value)}
//                 >
//                   <FormControlLabel
//                     value="student"
//                     control={<Radio />}
//                     label="Student"
//                     sx={{ color: "black" }}
//                   />
//                   <FormControlLabel
//                     value="admin"
//                     control={<Radio />}
//                     label="Admin"
//                     sx={{ color: "black" }}
//                   />
//                 </RadioGroup>
//               </FormControl>

//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={remember}
//                     onChange={(e) => setRemember(e.target.checked)}
//                   />
//                 }
//                 label="Remember me"
//                 sx={{ color: "black" }}
//               />
//             </Box>

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{
//                 backgroundColor: "#6e2ca3",
//                 color: "white",
//                 textTransform: "none",
//                 py: 1.5,
//                 fontWeight: "bold",
//                 borderRadius: 2,
//                 mt: 2,
//               }}
//             >
//               Register
//             </Button>

//             <Typography
//               variant="body2"
//               align="center"
//               mt={2}
//               sx={{ color: "black" }}
//             >
//               Already have an account?{" "}
//               <Link href="/" underline="hover">
//                 Login
//               </Link>
//             </Typography>
//           </form>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };



import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
  IconButton,
  InputAdornment
} from "@mui/material";
import image from "../images/register-img.png";
import { useNavigate } from "react-router-dom";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [role, setRole] = useState("student");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear errors
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (!isValid) return;

    try {
      let response;
      if (role === "admin") {
        response = await fetch("http://localhost:5000/admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            admin_name: name,
            admin_email: email,
            password: password,
          }),
        });
      } else {
        response = await fetch("http://localhost:5000/student", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student_name: name,
            student_email: email,
            password: password,
            department: department,
            year: year,
          }),
        });
      }

      const data = await response.json();
      if (!response.ok) {
        setEmailError(data.message || "Registration failed");
        return;
      }

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      setEmailError("An error occurred. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "86vh",
        backgroundColor: "#e9e0f6",
        display: "flex",
        paddingLeft: 45,
        paddingTop: 7,
        paddingBottom: 7,
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 4,
          overflow: "hidden",
          maxWidth: 1000,
        }}
      >
        {/* Left: Image */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            p: 2,
          }}
        >
          <Box
            component="img"
            src={image}
            alt="Library register"
            sx={{
              width: 400,
              maxWidth: 600,
              height: 600,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Box>

        {/* Right: Form */}
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: 600,
            width: 450,
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            mb={2}
            sx={{ color: "black" }}
          >
            {role === "student" ? "Student Register" : "Admin Register"}
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <VisibilityOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {role === "student" && (
              <>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <FormControl>
                <RadioGroup
                  row
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <FormControlLabel
                    value="student"
                    control={<Radio />}
                    label="Student"
                    sx={{ color: "black" }}
                  />
                  <FormControlLabel
                    value="admin"
                    control={<Radio />}
                    label="Admin"
                    sx={{ color: "black" }}
                  />
                </RadioGroup>
              </FormControl>

              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                }
                label="Remember me"
                sx={{ color: "black" }}
              /> */}
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#6e2ca3",
                color: "white",
                textTransform: "none",
                py: 1.5,
                fontWeight: "bold",
                borderRadius: 2,
                mt: 2,
              }}
            >
              Register
            </Button>

            <Typography
              variant="body2"
              align="center"
              mt={2}
              sx={{ color: "black" }}
            >
              Already have an account?{" "}
              <Link href="/" underline="hover">
                Login
              </Link>
            </Typography>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};
