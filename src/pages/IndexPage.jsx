import axios from "axios";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [placesData, setPlacesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} arrow`}
        style={{
          ...style,
          display: "block",
          right: 10,
          zIndex: 10,
          
        }}
        onClick={onClick}
      >
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} arrow`}
        style={{
          ...style,
          display: "block",
          left: 10,
          zIndex: 10,
         
        }}
        onClick={onClick}
      >
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg>

      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows:true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    axios.get("/places")
      .then((response) => {
        setPlacesData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {placesData.length > 0 &&
        placesData.map((place) => (
          <Link
            to={`place/${place._id}`}
            key={place._id}
            className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
          >
            <div className="relative">
              <Slider {...settings}>
                {place.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={`http://localhost:8081/uploads/${photo}`}
                    alt={`Image of ${place.title}`}
                    className="object-cover w-full h-48 md:h-64"
                  />
                ))}
              </Slider>
            </div>
            <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent w-full rounded-b-lg px-4 py-3 text-white">
              <h2 className="text-lg font-semibold truncate">{place.title}</h2>
              <h3 className="text-sm truncate">{place.address}</h3>
              <h3 className="font-bold text-lg">${place.price}/night</h3>
            </div>
          </Link>
        ))}
    </div>
  );
}
