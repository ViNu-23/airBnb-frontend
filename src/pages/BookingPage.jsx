import { useEffect, useState } from "react";
import AccountNavigation from "./AccountNavigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookingPage() {
  const [bookings, setBookings] = useState([]);

  const showToast = (type, message, duration = 2000) => {
    toast[type](message, {
      position: "bottom-center",
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  useEffect(() => {
    async function fetchBookings() {
      const response = await axios.get("/bookings");
      setBookings(response.data);
    }
    fetchBookings();
  }, []);

  async function cancelBooking(e, id) {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (userConfirmed) {
      try {
        const response = await axios.post("/cancelbooking", { id: id });
        if (response.status === 200) {
          setBookings((prevBookings) =>
            prevBookings.filter((booking) => booking._id !== id)
          );
          showToast("success", "Booking canceled successfully");
        } else {
          showToast("error", "Error while canceling your booking");
        }
      } catch (error) {
        showToast("error", "Error while canceling your booking");
      }
    }
  }

  return (
    <div className="">
      <AccountNavigation />
      {bookings.length === 0 ? (
        <div className="bg-gray-200 p-4 rounded-md text-center text-primary text-lg">
          No Bookings
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {bookings.map((booking) => {
            const checkInDate = new Date(booking.checkIn);
            const checkOutDate = new Date(booking.checkOut);
            const nights = Math.ceil(
              (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
            );

            return (
              <div
                key={booking._id}
                className="bg-gray-200 p-4 rounded-md flex flex-col gap-4 md:flex-row md:items-center"
              >
                <img
                  src={`http://localhost:8081/uploads/${booking.place.photos[0]}`}
                  alt={booking.place.title}
                  className="w-full md:w-48 h-40 object-cover rounded-md"
                />
                <div className="flex flex-col w-full md:w-2/3">
                  <div>
                    <span className="text-xl font-semibold mr-2 text-primary">
                      {booking.place.title},
                    </span>
                    <span className="text-gray-700 underline">
                      #{booking.place.address}
                    </span>
                  </div>
                  <div className="text-gray-500 flex flex-col gap-2 mt-1 md:flex-row md:items-center">
                    <div className="flex gap-1 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                        />
                      </svg>
                      {nights} {nights === 1 ? "night" : "nights"}
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="flex gap-1 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                          />
                        </svg>
                        {checkOutDate.toLocaleDateString()}
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                          />
                        </svg>
                      </div>
                      <div className="flex gap-1 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                          />
                        </svg>
                        {checkInDate.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 flex flex-col gap-2 md:flex-row md:items-center text-gray-500">
                    <p>Name: {booking.name}</p>
                    <p>Guests: {booking.guests}</p>
                    <p>Contact Number: {booking.number}</p>
                  </div>
                  <div className="mt-2 flex flex-col md:flex-row md:justify-between items-center text-xl font-semibold">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                        />
                      </svg>
                      <p>Total Price:</p>
                      <span>${booking.place.price * nights}</span>
                      <span className="font-normal text-gray-500">
                        for {nights} nights
                      </span>
                    </div>
                    <div className="mt-2 md:mt-0 flex flex-col md:flex-row gap-2">
                      <button className="px-5 py-1 rounded-md bg-primary text-white">
                        Pay Now
                      </button>
                      <button
                        onClick={(e) => cancelBooking(e, booking._id)}
                        className="px-5 py-1 rounded-md bg-gray-400 text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
