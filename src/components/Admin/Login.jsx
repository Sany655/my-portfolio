import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

function Login() {
    const { loginWithGoogle, currentUser } = useAuth();
    if (currentUser && (currentUser.email === process.env.REACT_APP_ADMIN_EMAIL)) {
        return <Navigate to="/admin/" replace />;
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <button
                onClick={loginWithGoogle}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
                Login with Google
            </button>
        </div>
    );
}

export default Login;