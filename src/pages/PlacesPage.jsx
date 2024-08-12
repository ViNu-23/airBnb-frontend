import { Link } from "react-router-dom";
import AccountNavigation from "./AccountNavigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  const deletePlace = (id) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this place permanently?");
  
    if (userConfirmed) {
      axios.post("/deleteplace", { placesId: id }).then(() => {
        setPlaces((prevPlaces) => prevPlaces.filter((place) => place._id !== id));
      });
    }
  };
  

  return (
    <div>
      <AccountNavigation />
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
      <div className="my-4">
        {places.length > 0 &&
          places.map((place, i) => (
            <div
              key={i}
              className="relative bg-gray-100 p-4 rounded-xl flex flex-col sm:flex-row gap-4 items-center sm:items-start my-4"
            >
              <div className="absolute top-4 right-4 flex space-x-2">
                <Link
                  to={"/account/places/" + place._id}
                  className="bg-primary text-white p-1 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </Link>
                <button
                  className="bg-primary text-white p-1 rounded-lg"
                  onClick={() => deletePlace(place._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
              <div className="w-full sm:w-44 h-32 sm:h-auto shrink-0">
                {place.photos.length > 0 && (
                  <img
                    src={`http://localhost:8081/uploads/` + place.photos[0]}
                    alt="img"
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>
              <div className="grow-0 shrink mt-2 sm:mt-0 text-center sm:text-left">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-1 text-justify">{place.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
