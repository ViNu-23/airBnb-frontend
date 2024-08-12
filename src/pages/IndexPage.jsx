import axios from "axios";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [placesData, setPlacesData] = useState([]);

  const SampleNextArrow = (props) => {
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
    axios.get("/places").then((response) => {
      const { data } = response;
      setPlacesData(data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {placesData.length > 0 &&
        placesData.map((place, i) => (
          <Link
            to={"place/" + place._id}
            key={i}
            className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="rounded-2xl">
              <Slider {...settings}>
                {place.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={`http://localhost:8081/uploads/${photo}`}
                    alt={`img-${index}`}
                    className="object-cover aspect-square w-full"
                  />
                ))}
              </Slider>
            </div>
            <div className="absolute bottom-0 left-0 bg-white bg-opacity-75 w-full rounded-b-2xl px-3 pb-2 md:px-4 md:pb-3">
              <h2 className="text-sm md:text-base font-bold text-primary truncate">
                {place.title}
              </h2>
              <h3 className="text-xs md:text-sm truncate">
                {place.address}
              </h3>
              <h3 className="text-primary font-bold text-xs md:text-sm">
                ${place.price}/Day
              </h3>
            </div>
          </Link>
        ))}
    </div>
  );
}
