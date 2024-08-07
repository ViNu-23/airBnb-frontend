import { Link } from "react-router-dom";
import AccountNavigation from "./AccountNavigation";


export default function PlacesPage() {
  return (
    <div>
      <AccountNavigation/>
      <div className="text-center">
          <Link
            className="bg-primary text-white rounded-full py-2 px-6 inline-flex gap-1 items-center"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
      </div>
    </div>
  );
}
