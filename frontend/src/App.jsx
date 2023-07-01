import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DatabaseTableView from "./pages/DatabaseTableView";
import SubmitRecordForm from "./pages/SubmitRecordForm";
import DatabaseMapView from "./pages/DatabaseMapView";
import NavgBar from "./components/NavgBar";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavgBar />
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dbtable" element={<DatabaseTableView />}></Route>
          <Route path="/dbmap" element={<DatabaseMapView />}></Route>
          <Route path="/submit" element={<SubmitRecordForm />}></Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
