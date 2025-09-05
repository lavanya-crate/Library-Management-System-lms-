import {
    Box, Grid, Paper, Typography, AppBar,
    
} from "@mui/material";
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
import { StudentSidebar } from "./StudentSidebar";


const bookData = [
    { name: "Culture On Display", count: 1 },
    { name: "Advances in Mechanical and Electronic..", count: 1 },
    { name: "Basic Electronics Engineering", count: 1 },
    { name: "When Gadgets Betray Us", count: 1 },
    { name: "MORE Electronic Gadgets for the..", count: 1 },
];

export const StudentDashboard = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        if (path) navigate(path);
    };

    return (
        <>
<StudentSidebar />
            <Box sx={{ backgroundColor: "#f3e5f5", mt: -2, pb: 1,}}>
                <Box sx={{ p: 3, ml: 44, pt: 20, }}>

                    <Grid container spacing={2} sx={{ ml: 5,   justifyContent: "space-around", }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper
                                elevation={3}
                                sx={{
                                    backgroundColor: "#4caf50",
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
                                    <Typography variant="h4">730</Typography>
                                    <Typography variant="h5" onClick={() => handleNavigation('/browsebooks')}>Browse Books</Typography>
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
                                    <Typography variant="h4">730</Typography>
                                    <Typography variant="h5" onClick={() => handleNavigation('/borrow')}>Borrow Book</Typography>
                                </Box>
                                <Box>
                                    <BookIcon fontSize="large" />
                                </Box>
                            </Paper>
                        </Grid>

                        
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

