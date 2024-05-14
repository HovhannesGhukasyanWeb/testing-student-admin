import Button from "../../ui/button";
import { useDispatch, useSelector } from 'react-redux'
import { LogOut } from 'lucide-react';
import { logout } from '../../store/slices/userSlice'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);
    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    }

    return (
        <div className="bg-white py-3 flex justify-between items-center px-5 border-b border-lightgray">
            <div>
                <h1 className="text-lg font-semibold">Student Testing Admin</h1>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-sm">
                    Welcome, <a href="/profile" className="font-semibold underline">{user.username}</a>
                </p>
                <Button variant="secondary" className="text-black flex items-center gap-2" onClick={logoutHandler}>
                    Logout
                    <LogOut className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}

export default Navbar;