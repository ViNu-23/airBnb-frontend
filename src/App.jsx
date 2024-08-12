import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
import { UserContextProvider } from "./userContext";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import BookingPage from "./pages/BookingPage";
import BookPlacePage from "./pages/BookPlacePage";

axios.defaults.baseURL = "http://localhost:8081";
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<BookPlacePage />} />
          <Route path="/account/bookings" element={<BookingPage />} />
        </Route> 
      </Routes> 
      </UserContextProvider>
  );
}
   