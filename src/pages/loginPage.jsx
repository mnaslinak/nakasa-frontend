import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleAuthButton from "../components/googleAuthButton";

export default function LoginPage() {

    const navigate = useNavigate();

    // Form data
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // Show / hide password
    const [showPassword, setShowPassword] = useState(false);

    // Error message
    const [error, setError] = useState("");

    // Loading state
    const [loading, setLoading] = useState(false);

    // Remember me
    const [rememberMe, setRememberMe] = useState(false);


    // Handle input changes
    function handleChange(e) {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setError("");
    }


    // Form submit
    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);

            const API_URL =
                import.meta.env.VITE_API_URL || "http://localhost:5000/api";

            const response = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email.trim().toLowerCase(),
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            if (!data.token) {
                throw new Error("Login succeeded but no authentication token was returned");
            }

            localStorage.setItem("token", data.token);

            if (data.isAdmin) {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
            setError(
                err.message ||
                "Login failed. Please check your email and password."
            );
        } finally {
            setLoading(false);
        }
    }


    return (

        <div className="min-h-screen bg-[#f8f8f8]
                        flex items-center justify-center
                        px-4 py-12">

            <div className="w-full max-w-md
                            bg-white
                            rounded-2xl
                            shadow-sm
                            border border-gray-100
                            p-6 md:p-10">


                {/* Logo */}
                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold tracking-[0.18em]">
                        NAKASA
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Welcome back
                    </p>

                </div>


                {/* Google Login */}
                <GoogleAuthButton />


                {/* Divider */}
                <div className="flex items-center gap-4 my-7">

                    <div className="flex-1 h-px bg-gray-200"></div>

                    <span className="text-sm text-gray-400">
                        OR
                    </span>

                    <div className="flex-1 h-px bg-gray-200"></div>

                </div>


                {/* Error */}
                {error && (

                    <div className="mb-5 p-3
                                    rounded-lg
                                    bg-red-50
                                    border border-red-200
                                    text-red-600
                                    text-sm">

                        {error}

                    </div>

                )}


                {/* Login Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >


                    {/* Email */}
                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            className="w-full border border-gray-300
                                       rounded-lg px-4 py-3
                                       outline-none
                                       focus:border-[#e99b70]"
                        />

                    </div>


                    {/* Password */}
                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Password
                        </label>

                        <div className="relative">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                                className="w-full border border-gray-300
                                           rounded-lg px-4 py-3 pr-12
                                           outline-none
                                           focus:border-[#e99b70]"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-4 top-1/2
                                           -translate-y-1/2
                                           text-gray-500"
                            >

                                {showPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                                }

                            </button>

                        </div>

                    </div>


                    {/* Remember Me + Forgot Password */}
                    <div className="flex items-center justify-between">

                        <label className="flex items-center gap-2
                                          text-sm text-gray-600">

                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) =>
                                    setRememberMe(e.target.checked)
                                }
                            />

                            Remember me

                        </label>


                        <Link
                            to="/forgot-password"
                            className="text-sm
                                       text-[#e99b70]
                                       hover:underline"
                        >
                            Forgot password?
                        </Link>

                    </div>


                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full
                                   bg-[#ffc29d]
                                   hover:bg-[#ffb589]
                                   disabled:opacity-60
                                   py-3
                                   rounded-lg
                                   font-semibold
                                   transition duration-300"
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </button>

                </form>


                {/* Register Link */}
                <p className="text-center text-sm text-gray-600 mt-7">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-[#e99b70]
                                   font-semibold
                                   hover:underline"
                    >
                        Create Account
                    </Link>

                </p>

            </div>

        </div>
    );
}