// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/layout/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import UsersList from "./pages/Users/UsersList";
// import UserDetails from "./pages/Users/UserDetails";
// import ExerciseList from "./pages/Exercises/ExerciseList";
// import SOSLogs from "./pages/SOS/SOSLogs";
// import CaregiverList from "./pages/Caregivers/CaregiverList";
// import TestReport from "./pages/Tests/TestReport";
// import UserTestHistory from "./pages/Tests/UserTestHistory";
// import TestsDashboard from "./pages/Tests/TestsDashboard";

// export default function App() {
//   return (
//     <BrowserRouter>
//       {/* ✅ Sidebar is fixed and never moves */}
//       <Sidebar />

//       {/* ✅ Main content adjusts next to fixed sidebar */}
//       <div className="ml-64 h-screen overflow-y-auto p-6 bg-gray-50">
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/users" element={<UsersList />} />
//           <Route path="/users/:id" element={<UserDetails />} />
//           <Route path="/exercises" element={<ExerciseList />} />
//           <Route path="/sos" element={<SOSLogs />} />
//           <Route path="/users/:id/test-history" element={<UserTestHistory />} />
//           <Route path="/test-history/:id" element={<TestReport />} />
//           <Route path="/caregivers" element={<CaregiverList />} />
//           <Route path="/tests" element={<TestsDashboard />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AuthProvider from "./context/AuthContext";
// import ProtectedRoute from "./components/layout/ProtectedRoute";
// import Sidebar from "./components/layout/Sidebar";

// // Login (public)
// import Login from "./pages/Login";

// // Protected pages
// import Dashboard from "./pages/Dashboard";
// import UsersList from "./pages/Users/UsersList";
// import UserDetails from "./pages/Users/UserDetails";
// import ExerciseList from "./pages/Exercises/ExerciseList";
// import SOSLogs from "./pages/SOS/SOSLogs";
// import CaregiverList from "./pages/Caregivers/CaregiverList";
// import TestReport from "./pages/Tests/TestReport";
// import UserTestHistory from "./pages/Tests/UserTestHistory";
// import TestsDashboard from "./pages/Tests/TestsDashboard";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>

//           {/* PUBLIC ROUTE */}
//           <Route path="/login" element={<Login />} />

//           {/* PROTECTED ROUTES GROUP */}
//           <Route element={<ProtectedRoute />}>

//             {/* Layout with Sidebar */}
//             <Route
//               path="/"
//               element={
//                 <div className="flex">
//                   <Sidebar />
//                   <div className="ml-64 h-screen p-6 w-full overflow-y-auto bg-gray-50">
//                     <Dashboard />
//                   </div>
//                 </div>
//               }
//             />

//             {/* All other protected pages */}
//             <Route
//               path="/users"
//               element={
//                 <div className="flex">
//                   <Sidebar />
//                   <div className="ml-64 h-screen p-6 w-full overflow-y-auto bg-gray-50">
//                     <UsersList />
//                   </div>
//                 </div>
//               }
//             />

//             <Route path="/users/:id" element={
//               <Page><UserDetails /></Page>
//             } />
//             <Route path="/caregivers" element={
//               <Page><CaregiverList /></Page>
//             } />
//             <Route path="/sos" element={
//               <Page><SOSLogs /></Page>
//             } />
//             <Route path="/tests" element={
//               <Page><TestsDashboard /></Page>
//             } />
//             <Route path="/exercises" element={
//               <Page><ExerciseList /></Page>
//             } />
//             <Route path="/users/:id/test-history" element={
//               <Page><UserTestHistory /></Page>
//             } />
//             <Route path="/test-history/:id" element={
//               <Page><TestReport /></Page>
//             } />

//           </Route>
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

// function Page({ children }) {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="ml-64 h-screen p-6 w-full overflow-y-auto bg-gray-50">
//         {children}
//       </div>
//     </div>
//   );
// }



import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";

// Login (public)
import Login from "./pages/Login";

// Protected pages
import Dashboard from "./pages/Dashboard";
import UsersList from "./pages/Users/UsersList";
import UserDetails from "./pages/Users/UserDetails";
import ExerciseList from "./pages/Exercises/ExerciseList";
import SOSLogs from "./pages/SOS/SOSLogs";
import CaregiverList from "./pages/Caregivers/CaregiverList";
import TestReport from "./pages/Tests/TestReport";
import UserTestHistory from "./pages/Tests/UserTestHistory";
import TestsDashboard from "./pages/Tests/TestsDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* PUBLIC ROUTE */}
          <Route path="/login" element={<Login />} />

          {/* PROTECTED ROUTES (all inside ProtectedRoute) */}
          <Route element={<ProtectedRoute />}>
            {/* You can treat both "/" and "/dashboard" as dashboard */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/users" element={<UsersList />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/exercises" element={<ExerciseList />} />
            <Route path="/sos" element={<SOSLogs />} />
            <Route path="/caregivers" element={<CaregiverList />} />
            <Route path="/tests" element={<TestsDashboard />} />
            <Route path="/users/:id/test-history" element={<UserTestHistory />} />
            <Route path="/test-history/:id" element={<TestReport />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
