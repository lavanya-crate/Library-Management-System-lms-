import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import image from "../images/logout-img.webp";
// import image from "../images/logout.jpg";
import { Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

export const LogoutPage = () => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/");
  };

  
  return (
    <Box
      sx={{
        minHeight: "86vh",
        backgroundColor: "#e9e0f6",
        display: "flex",
        paddingLeft: 65,
        paddingTop: 7,
        paddingBottom: 7
      }}
    >
      <Card sx={{ maxWidth: 700, width: 600 }}>
        <CardMedia
          component="img"
          height="350"
          src={image}
        />
        <CardContent>
          <Typography gutterBottom variant="body1" sx={{ color: 'text.secondary' }}>
            Are You Sure!
          </Typography>
        </CardContent>
        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{
            backgroundColor: "#6e2ca3",
            color: "white",
            textTransform: "none",
            py: 1.5,
            fontWeight: "bold",
            borderRadius: 2,
            mt: 1,
            mb: 5
          }}
        >
          Log Out
        </Button>
      </Card>
    </Box>
  );
}


