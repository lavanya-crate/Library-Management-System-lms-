import React from "react";
import {
  Box, Grid, Paper, Typography, AppBar,
  Toolbar, IconButton,
  Avatar,
  Menu,
  MenuItem,
  Container
} from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import BookIcon from '@mui/icons-material/Book';

import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from 'react';
import image from "../images/books.avif";
import { SidebarSection } from "./SidebarSection";


const bookData = [
  { name: "Culture On Display", count: 1 },
  { name: "Advances in Mechanical and Electronic..", count: 1 },
  { name: "Basic Electronics Engineering", count: 1 },
  { name: "When Gadgets Betray Us", count: 1 },
  { name: "MORE Electronic Gadgets for the..", count: 1 },
];

export const Dashboard = () => {
  const navigate = useNavigate();


  const handleNavigation = (path) => {
    if (path) navigate(path);
  };


  return (
    <>
      <SidebarSection />
      <Box sx={{ backgroundColor: "#f3e5f5", mt: -2, pb: 1 }}>
        <Box sx={{ p: 3, ml: 40, pt: 20, }}>
          <Grid container spacing={2} sx={{ ml: 5 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: "#2196f3",
                  color: "white",
                  p: 10,
                  ml: 2,
                  width: 200,
                  height: 65,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h4">2</Typography>
                  <Typography variant="body1" onClick={() => handleNavigation('/categories')}>Categories</Typography>
                </Box>
                <Box>
                  <InboxIcon fontSize="large" />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: "#f44336",
                  color: "white",
                  p: 10,
                  width: 200,
                  height: 65,
                  ml: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h4">6</Typography>
                  <Typography variant="body1" onClick={() => handleNavigation('/books')}>Books</Typography>
                </Box>
                <Box>
                  <MenuBookIcon fontSize="large" />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: "#ff9800",
                  color: "white",
                  p: 10,
                  ml: 2,
                  width: 200,
                  height: 65,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h4">61 | 32</Typography>
                  <Typography variant="body1" onClick={() => handleNavigation('/membership')}>Membership</Typography>
                </Box>
                <Box>
                  <PeopleIcon fontSize="large" />
                </Box>
              </Paper>
            </Grid>

            {/* <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: "#4caf50",
                  color: "white",
                  p: 10,
                  ml: 2,
                   width: 80,
                   height:65,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h4">730</Typography>
                  <Typography variant="body1" onClick={() => handleNavigation('/borrow')}>Borrow Book</Typography>
                </Box>
                <Box>
                  <BookIcon fontSize="large" />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: "#3f51b5",
                  color: "white",
                  p: 10,
                  ml: 2,
                   width: 80,
                   height:65,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h4">730</Typography>
                  <Typography variant="body1" onClick={() => handleNavigation('/return')}>Return Book</Typography>
                </Box>
                <Box>
                  <AssignmentReturnIcon fontSize="large" />
                </Box>
              </Paper>
            </Grid> */}
          </Grid>

          <Box sx={{ p: 3, ml: 2, mt: 10 }}>
            <Typography variant="h4" fontWeight="bold" mb={2}>
              Library Popular Book Data
            </Typography>
            <Paper sx={{ p: 2 }}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  layout="vertical"
                  data={bookData}
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={200} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};
