import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photolink, setPhotolink] = useState("");
  const [photo, setPhoto] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [info, setInfo] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guest, setGuest] = useState(1);

  function addPlaces(e) {
    e.preventDefault();
  }
  async function addPhotoByLinks(e) {
    e.preventDefault();
    const { data: addedImg } = await axios.post("/uploadbylink", {
      link: photolink,
    });
    setPhoto((prevPhoto) => [...prevPhoto, addedImg]);
    setPhotolink("");
  }

  function uploadPhoto(e) {
    e.preventDefault();
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photo", files[i]); 
    }
    axios.post("/uploads", data,{
      headers: {'Content-Type':'multipart/form-data'}
    }).then(response=>{
      const {data:filenames}=response;
      setPhoto((prevPhoto) =>{
        return [...prevPhoto,...filenames]
      })
    })
  }
  

  return (
    <div>
      <div className="text-center">
        {action !== "new" && (
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
        )}
      </div>
      {action == "new" && (
        <div className="mx-4">
          <form >
            <h2 className="text-l mt-2">Title</h2>
            <p className="text-gray-300 text-sm">Tittle of you place</p>
            <input
              type="text"
              name="title"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <h2 className="text-l mt-2">Address</h2>
            <p className="text-gray-300 text-sm">
              Detail address of this place
            </p>
            <input
              type="text"
              name="address"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <h2 className="text-l mt-2">Photos</h2>
            <p className="text-gray-300 text-sm">Photos of your place</p>
            <div className="flex gap-1">
              <input
                type="text"
                name="link"
                placeholder="Add Photos Url links"
                value={photolink}
                onChange={(e) => setPhotolink(e.target.value)}
              />
              <button
                onClick={addPhotoByLinks}
                className="bg-gray-200 px-4  rounded-2xl"
              >
                Add&nbsp;photo
              </button>
            </div>
            <div className=" mt-2 grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {photo.length >= 0 && (
                <>
                  {photo.map((imgName, index) => (
                    <div  key={index} className="h-32 flex object-cover">
                      <img
                      className="rounded-xl w-full"
                      src={"http://localhost:8081/uploads/" + imgName}
                      alt="img"
                    />
                    </div>
                  ))}
                </>
              )}

              <label className="flex items-center justify-center gap-1 border bg-transparent rounded-xl p-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="file"
                  name=""
                  id=""
                  className="hidden"
                  onChange={uploadPhoto}
                  multiple
                />
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
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>{" "}
                Upload
              </label>
            </div>
            <h2 className="text-l mt-2">Description</h2>
            <p className="text-gray-300 text-sm">Tell us more about place </p>
            <textarea
              className=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <h2 className="text-l mt-2">Perks</h2>
            <p className="text-gray-300 text-sm">
              Select all the perks of your place
            </p>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6  ">
              <label className="border p-4 flex rounded-xl gap-2 items-center cursor-pointer">
                <input type="checkbox" name="wifi"/>
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
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>

                <span>Wifi</span>
              </label>
              <label className="border p-4 flex rounded-xl gap-2 items-center cursor-pointer">
                <input type="checkbox" name="parking"/>
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
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>

                <span>Parking</span>
              </label>
              <label className="border p-4 flex rounded-xl gap-2 items-center cursor-pointer">
                <input type="checkbox" name="tv" />
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
                    d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>

                <span>TV</span>
              </label>
              <label className="border p-4 flex rounded-xl gap-2 items-center cursor-pointer">
                <input type="checkbox" name="radio"/>
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
                    d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>

                <span>Radio</span>
              </label>
              <label className="border p-4 flex rounded-xl gap-2 items-center cursor-pointer">
                <input type="checkbox" name="pets"/>
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
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>

                <span>Pets&nbsp;Allowed</span>
              </label>
              <label className="border p-4 flex rounded-xl gap-2 items-center cursor-pointer">
                <input type="checkbox" name="private-entrance"/>
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
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>

                <span>Private&nbsp;Entrance</span>
              </label>
            </div>
            <h2 className="text-l mt-2">Extra info</h2>
            <p className="text-gray-300 text-sm">
              Addition rules and regulation of the place
            </p>
            <textarea value={info} onChange={(e) => setInfo(e.target.value)} />

            <h2 className="text-l mt-2">Check In & Out</h2>
            <p className="text-gray-300 text-sm">
              Check in check out time and guest count
            </p>
            <div className="grid sm:grid-cols-3 gap-10">
              <div>
                <h3 className="mt-2 -mb-1">Check In</h3>
                <input
                  type="text"
                  placeholder="12:00"
                  value={checkin}
                  onChange={(e) => setCheckin(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check Out</h3>
                <input
                  type="text"
                  placeholder="21:00"
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max Guest</h3>
                <input
                  type="number"
                  placeholder="3"
                  value={guest}
                  onChange={(e) => setGuest(e.target.value)}
                />
              </div>
            </div>
            <div className="">
              <button onClick={addPlaces} className="primary my-6">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
