// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { RegisterPage } from "../components/RegisterPage";
// import { SigninPage } from "../components/SigninPage";
// import { CategoriesSection } from "../components/CategoriesSection";
// import { BookSection } from "../components/BookSection";
// import { LogoutPage } from "../components/LogoutPage";
// import { Dashboard } from "../components/Dashboard";
// import { StudentMembership } from "../components/StudentMembership";
// import { BorrowBook } from "../components/BorrowBook";
// import { StudentDashboard } from "../components/StudentDashboard";
// import { StudentHistory } from "../components/StudentHistory";
// import { BrowseBooks } from "../components/BrowseBooks";
// import { BorrowProvider } from "./context/BorrowContext";

// // All Routes Component
// const AllRoutes = () => {
//   return (
//     <BorrowProvider>
//     <Router>
//         <Routes>
//           <Route path="/" element={<SigninPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/logout" element={<LogoutPage />} />
//           <Route path="/categories" element={<CategoriesSection />} />
//           <Route path="/books" element={<BookSection />} />
//           <Route path="/membership" element={<StudentMembership />} />
//           <Route path="/admin" element={<Dashboard />} />
//           <Route path="/browsebooks" element={<BrowseBooks />} />
//           <Route path="/borrow" element={<BorrowBook />} />
//           <Route path="/student-history" element={<StudentHistory />} />
//           <Route path="/student" element={<StudentDashboard />} />
          
//         </Routes>
//     </Router>
//     </BorrowProvider>
//   );
// };

// export default AllRoutes;



import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RegisterPage } from "../components/RegisterPage";
import { SigninPage } from "../components/SigninPage";
import { CategoriesSection } from "../components/CategoriesSection";
import { BookSection } from "../components/BookSection";
import { LogoutPage } from "../components/LogoutPage";
import { Dashboard } from "../components/Dashboard";
import { StudentMembership } from "../components/StudentMembership";
import { BorrowBook } from "../components/BorrowBook";
import { StudentDashboard } from "../components/StudentDashboard";
// import { StudentHistory } from "../components/StudentHistory";
import { BrowseBooks } from "../components/BrowseBooks";
import { BorrowProvider } from "../context/BorrowContext";
import { WishListBooks } from "../components/WishListBook";




const AllRoutes = () => {
  return (
     <BorrowProvider> 
    <Router>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/categories" element={<CategoriesSection />} />
          <Route path="/books" element={<BookSection />} />
          <Route path="/membership" element={<StudentMembership />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/browsebooks" element={<BrowseBooks />} />
          <Route path="/borrow" element={<BorrowBook />} />
          <Route path="/wishlist" element={<WishListBooks />} />
          {/* <Route path="/student-history" element={<StudentHistory />} /> */}
          <Route path="/student" element={<StudentDashboard />} />
        </Routes>
    </Router>
     </BorrowProvider>
  );
};

export default AllRoutes;
