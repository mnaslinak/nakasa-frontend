import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    category: "",
    brand: "",
    gender: "",
    featured: false,
    discount: "",
    rating: "",
  });

  const [currentImage, setCurrentImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // GET PRODUCT
  // ==========================================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${API_URL}/products/${id}`
        );

        const data = await response.json();

        if (response.ok) {
          setFormData({
            name: data.name || "",
            description: data.description || "",
            price: data.price || "",
            oldPrice: data.oldPrice || "",
            category: data.category || "",
            brand: data.brand || "",
            gender: data.gender || "",
            featured: Boolean(data.featured),
            discount: data.discount ?? "",
            rating: data.rating ?? "",
          });

          setCurrentImage(data.image || "");
        } else {
          alert(data.message || "Product not found");
        }
      } catch (error) {
        console.error("Fetch product error:", error);
        alert("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==========================================
  // HANDLE IMAGE CHANGE
  // ==========================================
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  // ==========================================
  // UPDATE PRODUCT
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("oldPrice", formData.oldPrice);
      data.append("category", formData.category);
      data.append("brand", formData.brand);
      data.append("gender", formData.gender);
      data.append("featured", formData.featured);
      data.append("discount", formData.discount);
      data.append("rating", formData.rating);

      // Only send image if user selected a new one
      if (newImage) {
        data.append("image", newImage);
      }

      const response = await fetch(
        `${API_URL}/products/${id}`,
        {
          method: "PUT",
          body: data,
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Product updated successfully!");

        navigate("/admin");
      } else {
        alert(result.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Update product error:", error);
      alert("Something went wrong while updating the product");
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading product...</p>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Edit Product
            </h1>

            <p className="text-gray-500 mt-1">
              Update NAKASA product details
            </p>
          </div>

          <button
            onClick={() => navigate("/admin")}
            className="bg-gray-200 px-5 py-3 rounded hover:bg-gray-300"
          >
            Back
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow space-y-6"
        >

          {/* NAME */}
          <div>
            <label className="block font-medium mb-2">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block font-medium mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border p-3 rounded"
            />
          </div>

          {/* PRICE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block font-medium mb-2">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Old Price
              </label>

              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </div>

          </div>

          {/* CATEGORY + GENDER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block font-medium mb-2">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded"
              >
                <option value="">Select Gender</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

          </div>

          {/* BRAND */}
          <div>
            <label className="block font-medium mb-2">
              Brand
            </label>

            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
          </div>


          {/* EXTRA PRODUCT SETTINGS */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <div>
              <label className="block font-medium mb-2">
                Discount %
              </label>

              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Rating
              </label>

              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className="w-full border p-3 rounded"
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
              <span className="block font-medium">
                Featured / Latest Arrival
              </span>

              <span className="text-sm text-gray-500">
                Show this product in the latest-arrivals section.
              </span>
            </span>
          </label>

          {/* CURRENT IMAGE */}
          <div>
            <label className="block font-medium mb-3">
              Current Image
            </label>

            {currentImage && (
              <img
                src={currentImage}
                alt={formData.name}
                className="w-40 h-40 object-cover rounded border"
              />
            )}
          </div>

          {/* NEW IMAGE */}
          <div>
            <label className="block font-medium mb-2">
              Change Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-3 rounded"
            />

            <p className="text-sm text-gray-500 mt-2">
              Leave this empty if you want to keep the current image.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">

            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="flex-1 bg-gray-200 py-3 rounded hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-black text-white py-3 rounded hover:bg-gray-800 disabled:bg-gray-400"
            >
              {saving ? "Updating..." : "Update Product"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProductPage;