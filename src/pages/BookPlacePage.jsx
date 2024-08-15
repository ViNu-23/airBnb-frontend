import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookPlacePage() {
  const [place, setPlace] = useState([]);
  const [popPhoto, setPopPhoto] = useState(false);
  const { id } = useParams();

  const [checkInDate, setCheckInDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [checkOutDate, setCheckOutDate] = useState();
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [number, setNumber] = useState(0);

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

  async function onBookPlace() {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const todayDate = new Date();

    todayDate.setHours(0, 0, 0, 0);

    const timeDifference = checkOut - checkIn;
    const numberOfDays = timeDifference / (1000 * 60 * 60 * 24);

    if (!checkOutDate) {
      return alert("Select check-out date");
    }

    if (checkIn < todayDate) {
      alert("Check-in date cannot be in the past.");
      return;
    }

    if (numberOfDays <= 0) {
      alert("Check-out date must be at least one day after check-in date.");
      return;
    }

    if (guests > place.maxGuest) {
      alert(`Maximum guest count must be equal or below to ${place.maxGuest}`);
      return;
    }
    await axios.post(`/bookings/${id}`, {checkIn, checkOut, guests, name,number},).then(response=>{
      // console.log(response.data);
      
      if (response.status === 200) {
        showToast("success", "Place Booked Successfully");
      }else{
        showToast("error", "Something wend wrong, Please try again later",{response});
      }
    })
  }

  const SampleNextArrow = (props) => {
    // eslint-disable-next-line react/prop-types
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", right: 10 }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props) => {
    // eslint-disable-next-line react/prop-types
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", left: 10, zIndex: 1 }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    if (!id) return;
    axios.get(`/placeToBook/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (popPhoto) {
    return (
      <div className="absolute inset-0 bg-black min-h-screen bg-opacity-90">
        <div className="flex items-center justify-center h-screen">
          <div className="">
            <button
              onClick={() => setPopPhoto(false)}
              className="absolute z-10 right-10 top-10 bg-primary text-white p-2 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="w-1/2 h-1/2">
            <Slider {...settings}>
              {place.photos.map((photo, index) => (
                <img
                  key={index}
                  src={`http://localhost:8081/uploads/${photo}`}
                  alt={`img-${index}`}
                  className=""
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 flex w-full gap-8 flex-col lg:flex-row ">
        <div className="lg:w-1/2 shrink-0">
          <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
              <div>
                {place.photos?.[0] && (
                  <div className="">
                    <img
                      className="aspect-square object-cover"
                      src={"http://localhost:8081/uploads/" + place.photos?.[0]}
                      alt="img"
                    />
                  </div>
                )}
              </div>
              <div className="grid">
                {place.photos?.[1] && (
                  <img
                    className="aspect-square object-cover"
                    src={"http://localhost:8081/uploads/" + place.photos?.[1]}
                    alt="img"
                  />
                )}
                <div className="overflow-hidden">
                  {place.photos?.[2] && (
                    <img
                      className="aspect-square object-cover relative top-2"
                      src={"http://localhost:8081/uploads/" + place.photos?.[2]}
                      alt="img"
                    />
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => setPopPhoto(true)}
              className="flex items-center gap-2 absolute bottom-2 right-2  px-3 py-1 rounded-md bg-primary text-white text-sm shadow-gray-500 shadow-md"
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
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              Show more
            </button>
          </div>
        </div>
        <div>
          <div className="p-6 rounded-xl shadow-lg w-full">
            <p className="text-2xl font-semibold text-center text-primary">
              Price: ${place.price}/Night
            </p>
            <div className="lg:flex gap-8 justify-between mt-4">
              <div className="lg:w-1/2">
                <label className="text-primary">Check-in</label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
              </div>

              <div className="lg:w-1/2">
                <label className="text-primary">Check-out</label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                />
              </div>
            </div>

            <div className="lg:flex gap-8 justify-between mt-2">
              <div className="lg:w-1/2">
                <label className="text-primary">Max Guest</label>
                <input
                  type="number"
                  placeholder="3"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  min={1}
                />
              </div>

              <div className="lg:w-1/2">
                <label className="text-primary">Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <label className="text-primary">Phone number</label>
            <input
              type="number"
              placeholder="987-654-321"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />

            <button onClick={onBookPlace} className="primary w-full mt-4">
              Book Now
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <div className="lg:w-1/2 md:w-1/2 flex">
          <div className="">
            <div className="">
              <span className="text-3xl text-primary font-semibold">
                {place.title},
              </span>
              <a
                className="my-2 font-semibold underline flex"
                target="_blank"
                rel="noreferrer"
                href={"https://maps.google.com/?q=" + place.address}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    clipRule="evenodd"
                  />
                </svg>

                {place.address}
              </a>
            </div>
            <h2 className="font-semibold text-l text-primary mt-4">Perks:</h2>

            {place?.perks?.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {place.perks.map((perk) => (
                  <button
                    className="bg-gray-100 px-4 py-1 rounded-lg text-center capitalize"
                    key={perk}
                  >
                    {perk}
                  </button>
                ))}
              </div>
            )}
            <h2 className="font-semibold text-l text-primary mt-4">
              Check-in & out:
            </h2>

            <div className="flex gap-3 ">
              <button className="px-4 py-1 rounded-md bg-gray-100">
                Check-in time: {place.checkIn}
              </button>
              <button className="px-4 py-1 rounded-md bg-gray-100 ">
                Check-out time: {place.checkOut}
              </button>
              <button className="px-4 py-1 rounded-md bg-gray-100 ">
                Max Guest: {place.maxGuest}
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 text-justify">
          <h2 className="font-semibold text-l text-primary">Description:</h2>

          <p className="text-justify">{place.description}</p>

          <h2 className="font-semibold text-l text-primary mt-3">
            Additional Info:
          </h2>

          <span className="text-justify">{place.extraInfo}</span>
        </div>
      <ToastContainer />

      </div>
    </>
  );
}
