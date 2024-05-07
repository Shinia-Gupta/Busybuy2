import { useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { authSelector } from "../redux/reducers/authReducer";
// import { useAuth } from "../Context/AuthContext";
 
function Spinner() {
    const {loading}=useSelector(authSelector);

    return (
        <div className='flex justify-center items-center h-screen'>
            <HashLoader
                color="#FFBF00"
                loading={loading}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Spinner