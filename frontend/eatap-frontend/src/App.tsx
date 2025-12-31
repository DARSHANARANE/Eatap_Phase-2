// import { BrowserRouter, Routes, Route } from "react-router-dom";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<h1>Home – Eatap 🍱</h1>} />
//         <Route path="/login" element={<h1>Login Page</h1>} />
//         <Route path="/register" element={<h1>Register Page</h1>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import AppRoutes from "./routes/AppRoutes";

function App() {
  return <AppRoutes />;
}

export default App;

