import React, { useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getuser, updateProfileImage } from "../redux/slices/authslice";

const Editprofile = () => {
  const fileInputRef = useRef();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (!image) return alert("No image selected");

    const formData = new FormData();
    formData.append("profileimg", image);

    dispatch(updateProfileImage(formData)).then(() => {
      dispatch(getuser());
      setImage(null);
      setPreviewImage(null);
    });
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full py-6 flex flex-col gap-8 relative ">
      {/* Top Right Edit Button */}
      {/* <div className="absolute top-20 right-20">
        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl shadow-md text-lg hover:bg-gray-800 transition duration-200">
          <FaEdit />
          Edit
        </button>
      </div> */}

      {/* Profile Picture Section */}
      <div className="relative w-36 h-36 md:w-40 md:h-40 mx-auto">
        <img
          src={previewImage || user?.user?.profileimg}
          alt="Profile"
          className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
        />
        <button
          onClick={openFilePicker}
          className="absolute bottom-1 left-1 p-2 bg-black text-white rounded-full shadow-lg"
          title="Edit profile picture"
        >
          <FaEdit />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {image && (
          <button
            onClick={handleUpload}
            className="absolute top-20 right-32  -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-lg shadow-md"
          >
            Set Image
          </button>
        )}
      </div>

      {/* Edit Info Section */}
      <div className="w-full max-w-5xl mx-auto bg-white border border-gray-300 p-6 rounded-xl shadow-md">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-600">First Name</label>
            <input
              type="text"
              className="outline-none border border-gray-400 px-4 py-3 rounded-xl text-lg"
              disabled
              placeholder={user?.user?.firstName}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-600">Last Name</label>
            <input
              type="text"
              className="outline-none border border-gray-400 px-4 py-3 rounded-xl text-lg"
              disabled
              placeholder={user?.user?.lastName}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-600">Phone Number</label>
            <input
              type="number"
              className="outline-none border border-gray-400 px-4 py-3 rounded-xl text-lg"
              disabled
              placeholder={user?.user?.address[0]?.phone}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-600">Email Address</label>
            <input
              type="email"
              disabled
              className="outline-none border border-gray-400 px-4 py-3 rounded-xl text-lg"
              placeholder={user?.user?.email}
            />
          </div>
          <div className="col-span-1 md:col-span-2 flex flex-col">
            <label className="text-sm mb-1 text-gray-600">Address</label>
            <textarea
              disabled
              rows={2}
              className="outline-none border border-gray-400 px-4 py-3 rounded-xl text-lg resize-none"
              placeholder={user?.user?.address[0]?.address}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editprofile;
