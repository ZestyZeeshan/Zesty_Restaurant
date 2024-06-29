
import React from "react";
// import { Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from "./pages/Admin";
import CreateFood from "./pages/CreateFood";
import EditFood from "./pages/EditFood";
import DeleteFood from "./pages/DeleteFood";

const App=() => {
  return (
    <>
    <Routes>
      <Route
       path="/admin/*"
       element={
        <ProtectedRoute>
         <AdminRoutes/>
        </ProtectedRoute>
      }
      />
     
    </Routes>
    </>
  )
}

const AdminRoutes = () =>{
  return (
    <Routes>
      <Route path="/" element={<Admin/>}/>
      <Route path="/food/create" element={<CreateFood/>}/>
      <Route path="/food/edit/:id" element={<EditFood/>}/>
      <Route path="/food/delete/:id" element={<DeleteFood/>}/>
    </Routes>
  );
};

export default App;

