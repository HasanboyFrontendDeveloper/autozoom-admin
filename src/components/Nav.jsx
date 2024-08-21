
import {
    Navbar,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";


const Nav = () => {

    const navigate = useNavigate()


    const logoutHandler = () => {
        localStorage.removeItem('token')

        navigate('/login')
    }

    return (
        <div>

            <Navbar className="fixed top-0 z-10 h-max rounded-b-lg rounded-t-none px-4 py-2 lg:pl-8 lg:pr-20 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">

                    <div className=""></div>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block"></div>
                        <div className="flex items-center gap-x-5">
                            <h1 className="text-2xl">Admin</h1>
                            <Button
                                variant="gradient"
                                size="sm"
                                className="hidden lg:inline-block"
                                onClick={logoutHandler}
                                color="red"
                            >
                                <span className="text-sm">Log out</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </Navbar>
        </div>
    )
}

export default Nav