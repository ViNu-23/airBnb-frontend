import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNavigation from "./AccountNavigation";

export default function AccountPage() {
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subPage } = useParams();

  if (subPage === undefined) {
    subPage = "profile";
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  async function logoutUser() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNavigation/>
      {subPage === "profile" && user && (
        <div className="text-center max-w-md mx-auto">
          <span className="text-primary">
            Logged in as {user.name} ({user.email})
            <br />
          </span>
          <button onClick={logoutUser} className="primary max-w-xs mt-4">
            Logout
          </button>
        </div>
      )}
      {subPage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
}
   