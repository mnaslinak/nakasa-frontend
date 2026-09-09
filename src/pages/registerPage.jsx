import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleAuthButton from "../components/googleAuthButton";

export default function RegisterPage() {

    const navigate = useNavigate();

    // Form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    // Show / hide password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Error message
    const [error, setError] = useState("");

    // Loading state
    const [loading, setLoading] = useState(false);

    // Terms checkbox
    const [agreeTerms, setAgreeTerms] = useState(false);


    return (
        <div className="min-h-screen bg-[#f8f8f8]
                        flex items-center justify-center
                        px-4 py-12">

            <div className="w-full max-w-lg
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
                        Create your account
                    </p>

                </div>


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


                {/* Register Form */}
                <form
                    
                    className="space-y-5"
                >


                    {/* First Name + Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                First Name
                            </label>

                            <input
                                type="text"
                                name="firstName"
                               
                                placeholder="First name"
                                className="w-full border border-gray-300
                                           rounded-lg px-4 py-3
                                           outline-none
                                           focus:border-[#e99b70]"
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Last Name
                            </label>

                            <input
                                type="text"
                                name="lastName"
        
                                required
                                placeholder="Last name"
                                className="w-full border border-gray-300
                                           rounded-lg px-4 py-3
                                           outline-none
                                           focus:border-[#e99b70]"
                            />
                        </div>

                    </div>


                    {/* Email */}
                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            
                            required
                            placeholder="Enter your email"
                            className="w-full border border-gray-300
                                       rounded-lg px-4 py-3
                                       outline-none
                                       focus:border-[#e99b70]"
                        />

                    </div>


                    {/* Phone */}
                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Phone Number
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            
                            placeholder="07XXXXXXXX"
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
                                type={showPassword ? "text" : "password"}
                                name="password"
                             
                                minLength={8}
                                placeholder="Minimum 8 characters"
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


                    {/* Confirm Password */}
                    <div>

                        <label className="block text-sm font-medium mb-2">
                            Confirm Password
                        </label>

                        <div className="relative">

                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                name="confirmPassword"
                               
                                placeholder="Confirm your password"
                                className="w-full border border-gray-300
                                           rounded-lg px-4 py-3 pr-12
                                           outline-none
                                           focus:border-[#e99b70]"
                            />

                            <button
                                type="button"
                                
                                    )
                                }
                                className="absolute right-4 top-1/2
                                           -translate-y-1/2
                                           text-gray-500"
                            >
                                {showConfirmPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                                }
                            </button>

                        </div>

                    </div>


                    {/* Terms */}
                    <div className="flex items-start gap-3">

                        <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) =>
                                setAgreeTerms(e.target.checked)
                            }
                            className="mt-1"
                        />

                        <p className="text-sm text-gray-600">

                            I agree to the{" "}

                            <Link
                                to="/terms"
                                className="text-[#e99b70] hover:underline"
                            >
                                Terms & Conditions
                            </Link>

                            {" "}and{" "}

                            <Link
                                to="/privacy-policy"
                                className="text-[#e99b70] hover:underline"
                            >
                                Privacy Policy
                            </Link>

                        </p>

                    </div>


                    {/* Register Button */}
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
                            ? "Creating Account..."
                            : "Create Account"
                        }

                    </button>

                </form>


                {/* Login Link */}
                <p className="text-center text-sm text-gray-600 mt-7">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-[#e99b70]
                                   font-semibold
                                   hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}