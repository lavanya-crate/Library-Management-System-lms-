// import React from 'react';

// import './App.css';
// import { SidebarSection } from './components/SidebarSection';
// import LoginForm from './components/LoginPage';

// function App() {
//   return (
//     <div className="App">
//    <SidebarSection />
//    <LoginForm />
//     </div>
//   );
// }

// export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import './App.css';
// import { SidebarSection } from './components/SidebarSection';
// import{ RegisterPage } from './components/RegisterPage';
// import { SigninPage } from './components/SigninPage';
// import { CategoriesSection } from "./components/CategoriesSection";
// import { BookSection } from './components/BookSection';
// import {LogoutPage }from "./components/LogoutPage";
// import { Dashboard } from "./components/Dashboard";


// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <SidebarSection />
//         <Routes>
//           <Route path="/sidebar" element={<SidebarSection />} />
//                 <Route path="/sign" element={<SigninPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/logout" element={<LogoutPage />} />
//           <Route path="/categories" element={<CategoriesSection />} />
//            <Route path="/books" element={<BookSection />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import './App.css';
import AllRoutes from './routes/AllRoutes';

function App() {
  return (
    <div className="App">
     <AllRoutes/>  
    </div>
  );
}

export default App;

