import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DatabaseTableView from "./pages/DatabaseTableView";
import SelectTreeForReport from "./pages/SelectTreeForReport";
import SubmitRecordForm from "./pages/SubmitRecordForm";
import SubmitReportLocation from "./pages/SubmitReportLocation";
import DatabaseMapView from "./pages/DatabaseMapView";
import UserDash from "./pages/UserDash";
import AdminDash from "./pages/AdminDash";
import NavgBar from "./components/NavgBar";
import ViewAllTrees from "./pages/ViewAllTrees";
import ViewTree from "./pages/ViewTree";
import ViewReport from "./pages/ViewReport";
import SuggestTreeForReport from "./pages/SuggestTreeForReport";
import UpdateReportForm from "./pages/UpdateReportForm";

import { Provider } from "react-redux";
import { store } from "./app/store";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <NavgBar />
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/dbtable" element={<DatabaseTableView />}></Route>
            <Route path="/dbmap" element={<DatabaseMapView />}></Route>
            <Route
              path="/submitLocation"
              element={<SubmitReportLocation />}
            ></Route>
            <Route path="/selectTree" element={<SelectTreeForReport />}></Route>
            <Route
              path="/submitForm/:treeID"
              element={<SubmitRecordForm />}
            ></Route>
            <Route path="/dash" element={<UserDash />}></Route>
            <Route path="/adminDash" element={<AdminDash />}></Route>
            <Route path="/viewAllTrees" element={<ViewAllTrees />}></Route>
            <Route path="/viewTree/:id" element={<ViewTree />}></Route>
            <Route
              path="/suggestTree"
              element={<SuggestTreeForReport />}
            ></Route>
            <Route path="/viewReport/:id" element={<ViewReport />}></Route>
            <Route
              path="/updateReport/:reportID"
              element={<UpdateReportForm />}
            ></Route>
          </Routes>
        </Router>
        <ToastContainer />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
