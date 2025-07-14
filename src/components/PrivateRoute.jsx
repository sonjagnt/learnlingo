import { Navigate } from "react-router";
import { useAuth } from "../contexts/auth-context";




function PrivateRoute ({children, redirectTo = '/'}) {
const {user} = useAuth()
    return user ? children : <Navigate to={redirectTo} />;
}

export default PrivateRoute;