import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const PRODUCTS_PER_PAGE = 4;

const AdminPage = () => {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("dashboard");

  // Dashboard data
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [orders, setOrders] = useState([]);

  // Admin product management data
  const [allProducts, setAllProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
  const [sortFilter, setSortFilter] = useState("Newest");
  const [productPage, setProductPage] = useState(1);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingAdminProducts, setLoadingAdminProducts] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);

  
      const response = await fetch(
        `${API_URL}/products?page=1&limit=4`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      setProducts(data.products || []);
      setTotalProducts(data.totalProducts || 0);
    } catch (error) {
      console.error("Fetch dashboard products error:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  // --------------------------------------------------
  // FETCH ORDERS
  // --------------------------------------------------
  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);

      const response = await fetch(`${API_URL}/orders`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch orders error:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchDashboardProducts();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (activePage === "products") {
      fetchAdminProducts();
      setProductPage(1);
    }
  }, [activePage]);




  const getCurrentAdminEmail = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return "";

      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.email || "";
    } catch {
      return "";
    }
  };

  const fetchUsers = async (page = 1) => {
    try {
      setLoadingUsers(true);

      const response = await fetch(
        `${API_URL}/users/getAllUsers/10/${page}`,
        {
          headers: getAuthHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }

      setUsers(data.users || []);
      setTotalUsers(data.totalUsers || 0);
      setUserTotalPages(Math.max(data.totalPages || 1, 1));
    } catch (error) {
      console.error("Fetch users error:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSwitchRole = async (email) => {
    const currentAdminEmail = getCurrentAdminEmail();

    if (email === currentAdminEmail) {
      alert("You cannot change your own role.");
      return;
    }

    if (!window.confirm("Change this user's admin role?")) return;

    try {
      const response = await fetch(
        `${API_URL}/users/switchRole/${encodeURIComponent(email)}`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change role");
      }

      alert(data.message || "User role updated successfully");
      await fetchUsers(userPage);
    } catch (error) {
      console.error("Switch role error:", error);
      alert(error.message || "Failed to change user role");
    }
  };

  const handleToggleUserState = async (email, isBlocked) => {
    const currentAdminEmail = getCurrentAdminEmail();

    if (email === currentAdminEmail) {
      alert("You cannot block or unblock your own account.");
      return;
    }

    const action = isBlocked ? "unblock" : "block";

    if (!window.confirm(`Are you sure you want to ${action} this user?`)) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/users/updateUserState/${encodeURIComponent(email)}`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Failed to ${action} user`
        );
      }

    if (sortFilter === "PriceHigh") {
      result.sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      );
    }

    if (sortFilter === "Name") {
      result.sort((a, b) =>
        String(a.name || "").localeCompare(String(b.name || ""))
      );
    }

    return result;
  }, [
    allProducts,
    productSearch,
    categoryFilter,
    genderFilter,
    sortFilter,
  ]);

  const totalProductPages = Math.max(
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
    1
  );

  const visibleProducts = filteredProducts.slice(
    (productPage - 1) * PRODUCTS_PER_PAGE,
    productPage * PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    if (productPage > totalProductPages) {
      setProductPage(totalProductPages);
    }
  }, [productPage, totalProductPages]);

  const resetProductFilters = () => {
    setProductSearch("");
    setCategoryFilter("All");
    setGenderFilter("All");
    setSortFilter("Newest");
    setProductPage(1);
  };

  // --------------------------------------------------
  // PRODUCT ACTIONS
  // --------------------------------------------------
  const handleEdit = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      alert("Product deleted successfully");

      await Promise.all([
        fetchDashboardProducts(),
        fetchAdminProducts(),
      ]);
    } catch (error) {
      console.error("Delete error:", error);
      alert(
        error.message ||
          "Something went wrong while deleting the product"
      );
    }
  };


  // --------------------------------------------------
  // DASHBOARD STATS
  // --------------------------------------------------
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const totalSales = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

  const latestProducts = products.slice(0, 4);
  const latestOrders = orders.slice(0, 4);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="min-h-screen w-64 shrink-0 bg-black p-6 text-white">
        <h1 className="mb-10 text-2xl font-bold">NAKASA</h1>

        <nav className="space-y-3">
          {[
            ["dashboard", "Dashboard"],
            ["products", "Products"],
            ["orders", "Orders"],
            ["users", "Users"],
            ["settings", "Settings"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActivePage(key)}
              className={`block w-full rounded px-4 py-3 text-left transition ${
                activePage === key
                  ? "bg-white text-black"
                  : "hover:bg-gray-800"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN */}
      <main className="min-w-0 flex-1 p-8">
        {/* ==========================================
            DASHBOARD
        ========================================== */}
        {activePage === "dashboard" && (
          <>
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-3xl font-bold">Dashboard</h2>
                <p className="mt-1 text-gray-500">
                  Welcome back to the NAKASA Admin Panel
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/admin/products/add")}
                  className="rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
                >
                  + Add Product
                </button>

                <button
                  onClick={() => setActivePage("orders")}
                  className="rounded-lg border border-black bg-white px-6 py-3 font-semibold hover:bg-gray-50"
                >
                  View Orders
                </button>
              </div>
            </div>

            {/* MAIN STATS */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Total Products</p>
                <h3 className="mt-3 text-4xl font-bold">
                  {totalProducts}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  Products in your store
                </p>
              </div>

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Total Orders</p>
                <h3 className="mt-3 text-4xl font-bold">
                  {orders.length}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  All customer orders
                </p>
              </div>

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Total Sales</p>
                <h3 className="mt-3 text-3xl font-bold">
                  Rs. {totalSales.toLocaleString()}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  Excluding cancelled orders
                </p>
              </div>

              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Delivered</p>
                <h3 className="mt-3 text-4xl font-bold">
                  {deliveredOrders}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  Successfully delivered
                </p>
              </div>
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Registered Users</p>
                <h3 className="mt-3 text-4xl font-bold">
                  {totalUsers}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  Customer accounts
                </p>
              </div>
            </div>

            {/* ORDER STATUS */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                ["Pending", pendingOrders],
                ["Processing", processingOrders],
                ["Shipped", shippedOrders],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{label}</p>
                      <h3 className="mt-3 text-3xl font-bold">
                        {value}
                      </h3>
                    </div>

                    <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>


        {/* ==========================================
            PRODUCTS
        ========================================== */}
        {activePage === "products" && (
          <>
            <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-3xl font-bold">Products</h2>
                <p className="mt-1 text-gray-500">
                  Manage your NAKASA products
                </p>
              </div>

              <button
                onClick={() => navigate("/admin/products/add")}
                className="rounded-lg bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800"
              >
                + Add Product
              </button>
            </div>

            {/* FILTER BAR */}
            <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => {
                    setProductSearch(e.target.value);
                    setProductPage(1);
                  }}
                  placeholder="Search products..."
                  className="rounded-lg border px-4 py-3 outline-none focus:border-black"
                />

                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setProductPage(1);
                  }}
                  className="rounded-lg border px-4 py-3 outline-none focus:border-black"
                >
                  <option value="All">All Categories</option>
                  <option value="Sunglasses">Sunglasses</option>
                  <option value="Watches">Watches</option>
                  <option value="Accessories">Accessories</option>
                </select>

                <select
                  value={genderFilter}
                  onChange={(e) => {
                    setGenderFilter(e.target.value);
                    setProductPage(1);
                  }}
                  className="rounded-lg border px-4 py-3 outline-none focus:border-black"
                >
                  <option value="All">All Genders</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Unisex">Unisex</option>
                </select>

                <select
                  value={sortFilter}
                  onChange={(e) => {
                    setSortFilter(e.target.value);
                    setProductPage(1);
                  }}
                  className="rounded-lg border px-4 py-3 outline-none focus:border-black"
                >
                  <option value="Newest">Newest First</option>
                  <option value="Oldest">Oldest First</option>
                  <option value="PriceLow">Price: Low to High</option>
                  <option value="PriceHigh">Price: High to Low</option>
                  <option value="Name">Name: A to Z</option>
                </select>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-black">
                    {filteredProducts.length}
                  </span>{" "}
                  product{filteredProducts.length !== 1 ? "s" : ""}
                </p>

                <button
                  onClick={resetProductFilters}
                  className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* PRODUCT TABLE */}
            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
              {loadingAdminProducts ? (
                <div className="p-10 text-center text-gray-500">
                  Loading products...
                </div>
              ) : visibleProducts.length === 0 ? (
                <div className="p-10 text-center text-gray-500">
                  No products match your filters.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1050px]">
                    <thead className="bg-gray-100">
                      <tr>
                        {[
                          "Product",
                          "Category",
                          "Gender",
                          "Price",
                          "Discount",
                          "Rating",
                          "Featured",
                          "Actions",
                        ].map((heading) => (
                          <th
                            key={heading}
                            className="p-4 text-left text-sm font-semibold"
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {visibleProducts.map((product) => (
                        <tr
                          key={product._id}
                          className="border-t hover:bg-gray-50"
                       
                <button
                  onClick={() =>
                    setProductPage((page) =>
                      Math.min(page + 1, totalProductPages)
                    )
                  }
                  disabled={productPage === totalProductPages}
                  className="rounded-lg border bg-white px-4 py-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* ==========================================
            ORDERS
        ========================================== */}
        {activePage === "orders" && (
          <>
            <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-3xl font-bold">Orders</h2>
                <p className="mt-1 text-gray-500">
                  Manage customer orders and track delivery status.
                </p>
              </div>

              <div className="rounded-lg border bg-white px-5 py-3 shadow-sm">
                <span className="text-sm text-gray-500">Total Orders</span>
                <span className="ml-3 text-xl font-bold">
                  {orders.length}
                </span>
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
              {[
                ["All", orders.length],
                ["Pending", pendingOrders],
                ["Processing", processingOrders],
                ["Shipped", shippedOrders],
                ["Delivered", deliveredOrders],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border bg-white p-5 shadow-sm"
                >
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="mt-2 text-3xl font-bold">{value}</p>
                </div>
              ))}
            </div>

            {loadingOrders ? (
              <div className="rounded-xl border bg-white p-10 text-center text-gray-500 shadow-sm">
                Loading orders...
              </div>
            ) : orders.length === 0 ? (
              <div className="rounded-xl border bg-white p-10 text-center text-gray-500 shadow-sm">
                No orders yet.
              </div>
            ) : (
              <div className="space-y-5">
                {orders.map((order) => {
                  const customerName = `${order.customer?.firstName || "Customer"} ${
                    order.customer?.lastName || ""
                  }`.trim();

                  const orderDate = order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString(
                        "en-LK",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )
                    : "Date unavailable";

                  const statusClasses = {
                    Pending:
                      "bg-yellow-100 text-yellow-700 border-yellow-200",
                    Processing:
                      "bg-blue-100 text-blue-700 border-blue-200",
                    Shipped:
                      "bg-purple-100 text-purple-700 border-purple-200",
                    Delivered:
                      "bg-green-100 text-green-700 border-green-200",
                    Cancelled:
                      "bg-red-100 text-red-700 border-red-200",
                  };

                  return (
                    <div
                      key={order._id}
                      className="overflow-hidden rounded-xl border bg-white shadow-sm"
                    >
                      

                        <div className="flex flex-col items-start gap-2 md:items-end">
                          <p className="text-xl font-bold">
                            Rs.{" "}
                            {Number(order.total || 0).toLocaleString()}
                          </p>

                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleOrderStatus(
                                order._id,
                                e.target.value
                              )
                           
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Phone
                          </p>
                          <p className="mt-1">
                            {order.customer?.phone || "Not provided"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Location
                          </p>
                          <p className="mt-1">
                            {order.customer?.city || "Not provided"}
                          </p>
                        </div>
                      </div>

                      {/* ORDER ITEMS */}
                      <div className="p-5">
                        <div className="mb-4 flex items-center justify-between">
                          <h4 className="font-bold">Order Items</h4>
                          <span className="text-sm text-gray-500">
                            {order.items?.length || 0} item
                            {(order.items?.length || 0) !== 1
                              ? "s"
                              : ""}
                          </span>
                        </div>

                        <div className="space-y-3">
                          {(order.items || []).map((item, index) => (
                            <div
                              key={`${order._id}-${item.productId}-${index}`}
                              className="flex items-center justify-between gap-4 rounded-lg border bg-gray-50 p-4"
                            >
                              <div className="min-w-0">
                                <p className="truncate font-semibold">
                                  {item.name}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  Rs.{" "}
                                  {Number(
                                    item.price || 0
                                  ).toLocaleString()}{" "}
                                  × {item.quantity}
                                </p>
                              </div>

                              <p className="shrink-0 font-semibold">
                                Rs.{" "}
                                {(
                                  Number(item.price || 0) *
                                  Number(item.quantity || 0)
                                ).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* USERS */}
        {activePage === "users" && (
          <>
            <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-3xl font-bold">Users</h2>
                <p className="mt-1 text-gray-500">
                  Manage registered customers and administrator roles.
                </p>
              </div>

              <div className="rounded-lg border bg-white px-5 py-3 shadow-sm">
                <span className="text-sm text-gray-500">Total Users</span>
                <span className="ml-3 text-xl font-bold">{totalUsers}</span>
              </div>
            </div>

            <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              />
           

                                  <button
                                    disabled={isCurrentUser}
                                    onClick={() =>
                                      handleToggleUserState(
                                        user.email,
                                        user.isBlocked
                                      )
                                    }
                                    className={`rounded-lg px-3 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40 ${
                                      user.isBlocked
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-red-500 hover:bg-red-600"
                                    }`}
                                  >
                                    {user.isBlocked
                                      ? "Unblock"
                                      : "Block"}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          
                    />
                  </label>

              

              <div className="rounded-xl border bg-white p-6 shadow-sm xl:col-span-2">
                <h3 className="text-xl font-bold">Admin Account</h3>
                <p className="mt-1 text-sm text-gray-500">
                  End your current admin session.
                </p>

                <button
                  onClick={() => {
                    if (!window.confirm("Are you sure you want to logout?")) {
                      return;
                    }

                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/login");
                  }}
                  className="mt-5 rounded-lg bg-red-500 px-5 py-3 font-semibold text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
