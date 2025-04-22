import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/slices/productslice"; // Adjust the path as needed
import { toast } from "react-toastify";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.product);

  const [formData, setFormData] = useState({
    title: "white tshirt",
    titleDescription: "white tshirt hai",
    stars: 4,
    actualPrice: "25847",
    offerPrice: "100",
    category: "",
    subcategory:"",
    shortDescription: "very attractive tshirt and nice fitting",
    color: [],
    availableSizes: [],
    image: null,
    longDescription:
      "this is vey cool tshirt",
    additionalInformation:
      "size- all size avalbale ",
  });

  const [previewImage, setPreviewImage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    setPreviewImage(URL.createObjectURL(file)); // Preview image
  };

  // Handle multi-select (colors & sizes)
  const handleMultiSelect = (e, field) => {
    const options = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData((prev) => ({ ...prev, [field]: options }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addProduct(formData));
    toast("product is added")
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-lg font-semibold mb-2">
              Product Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Product Title"
              onChange={handleChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              required
              value={formData.title}
            />
          </div>

          <div>
            <label
              htmlFor="titleDescription"
              className="block text-lg font-semibold mb-2"
            >
              Title Description
            </label>
            <input
              type="text"
              name="titleDescription"
              id="titleDescription"
              placeholder="Title Description"
              onChange={handleChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              required
              value={formData.titleDescription}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="stars" className="block text-lg font-semibold mb-2">
              Rating (0-5)
            </label>
            <input
              type="number"
              name="stars"
              id="stars"
              placeholder="Rating (0-5)"
              onChange={handleChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              value={formData.stars}
            />
          </div>

          <div>
            <label
              htmlFor="actualPrice"
              className="block text-lg font-semibold mb-2"
            >
              Actual Price
            </label>
            <input
              type="number"
              name="actualPrice"
              id="actualPrice"
              placeholder="Actual Price"
              onChange={handleChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              required
              value={formData.actualPrice}
            />
          </div>

          <div>
            <label
              htmlFor="offerPrice"
              className="block text-lg font-semibold mb-2"
            >
              Offer Price
            </label>
            <input
              type="number"
              name="offerPrice"
              id="offerPrice"
              placeholder="Offer Price"
              onChange={handleChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              required
              value={formData.offerPrice}
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Category</label>
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">subcategory</label>
            <input
              type="text"
              placeholder="subcategory"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="shortDescription"
            className="block text-lg font-semibold mb-2"
          >
            Short Description
          </label>
          <textarea
            name="shortDescription"
            id="shortDescription"
            placeholder="Short Description"
            onChange={handleChange}
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            required
            value={formData.shortDescription}
          ></textarea>
        </div>

        {/* Multi-Select for Colors */}
        <div>
          <label htmlFor="color" className="block text-lg font-semibold mb-2">
            Select Colors
          </label>
          <select
            multiple
            onChange={(e) => handleMultiSelect(e, "color")}
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Black">Black</option>
          </select>
        </div>

        {/* Multi-Select for Sizes */}
        <div>
          <label
            htmlFor="availableSizes"
            className="block text-lg font-semibold mb-2"
          >
            Select Sizes
          </label>
          <select
            multiple
            onChange={(e) => handleMultiSelect(e, "availableSizes")}
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="S">Small (S)</option>
            <option value="M">Medium (M)</option>
            <option value="L">Large (L)</option>
            <option value="XL">Extra Large (XL)</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-lg font-semibold mb-2">
            Product Image
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-4 w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>

        <div>
          <label
            htmlFor="longDescription"
            className="block text-lg font-semibold mb-2"
          >
            Long Description
          </label>
          <textarea
            name="longDescription"
            id="longDescription"
            placeholder="Long Description"
            onChange={handleChange}
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            value={formData.longDescription}
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="additionalInformation"
            className="block text-lg font-semibold mb-2"
          >
            Additional Information
          </label>
          <textarea
            name="additionalInformation"
            id="additionalInformation"
            placeholder="Additional Information"
            onChange={handleChange}
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            value={formData.additionalInformation}
          ></textarea>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default AddProduct;
