import "./App.css"
import SignUp from "./Components/Signup"
import Footer from "../src/Components/Footer";
import Nav from "../src/Components/Nav"
import PrivateComponents from "./Components/PrivateComponents";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import AddProduct from "./Components/AddProduct";
import ProductList from "./Components/ProductList";
import UpdateProduct from "./Components/UpdateProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route element={<PrivateComponents/>}>
          <Route path="/" element={ <ProductList />} />
          <Route path="/add" element={< AddProduct/>} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/logout" element={<h1> Logout Component</h1>} />
          <Route path="/profile" element={<h1> Profile Component</h1>} />
        </Route>
          
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;