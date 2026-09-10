import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const initialForm = {
  name: "",
  description: "",
  price: "",
  oldPrice: "",
  category: "",
  gender: "",
  brand: "NAKASA",
  featured: false,
  discount: "",
  rating: "",
};

const AddProductPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;

    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select a product image");
      return;
    }

    setSaving(true);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      data.append("image", image);

      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add product");
      }

      alert("Product added successfully!");

      setFormData(initialForm);
      setImage(null);
      setPreview("");
      navigate("/admin");
    } catch (error) {
      console.error("Add product error:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Add Product</h1>
            <p className="mt-1 text-gray-500">
              Add a new product to the NAKASA store.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="rounded-lg bg-gray-200 px-5 py-3 hover:bg-gray-300"
          >
            Back
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl bg-white p-6 shadow-sm md:p-8"
        >
          <div>
            <label className="mb-2 block font-medium">Product Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
              placeholder="Example: Classic Black Sunglasses"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
              placeholder="Describe the product..."
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Old Price</label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
              >
                <option value="">Select Category</option>
                <option value="Sunglasses">Sunglasses</option>
                <option value="Watches">Watches</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
              >
                <option value="">Select Gender</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className="mb-2 block font-medium">Brand</label>
              <input
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Discount %</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">Rating</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
                placeholder="0 - 5"
              />
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span>
              <span className="block font-medium">Featured / Latest Arrival</span>
              <span className="text-sm text-gray-500">
                Show this product in the latest-arrivals section.
              </span>
            </span>
          </label>

          <div>
            <label className="mb-2 block font-medium">Product Image</label>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageChange}
              required
              className="w-full rounded-lg border border-gray-300 p-3"
            />

            {preview && (
              <img
                src={preview}
                alt="Product preview"
                className="mt-4 h-48 w-48 rounded-lg border object-cover"
              />
            )}
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="flex-1 rounded-lg bg-gray-200 py-3 font-medium hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-black py-3 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {saving ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
