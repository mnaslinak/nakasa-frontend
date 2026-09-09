import { FcGoogle } from "react-icons/fc";

export default function GoogleAuthButton() {

    const handleGoogleRegister = () => {
        // Later we will connect this to our backend
        console.log("Google registration clicked");
    };

    return (
        <button
            type="button"
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-3
                       border border-gray-300 rounded-lg
                       py-3 bg-white
                       hover:bg-gray-50
                       transition duration-300"
        >
            <FcGoogle size={22} />

            <span className="font-medium">
                Continue with Google
            </span>
        </button>
    );
}