import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    CircleStackIcon,
    BuildingStorefrontIcon,
    NewspaperIcon,
    MapIcon,
    BuildingOffice2Icon,
    TruckIcon,
} from "@heroicons/react/24/solid";


import React from 'react'
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

    const navigate = useNavigate()

    return (
        <>
            <Card className="h-[100vh] w-full max-w-[15rem] rounded-none bg-primary p-4 shadow-xl shadow-blue-gray-900/5 fixed z-10 ">
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="white" >
                        <span className="hover:text-blue-700 transition duration-300 ">
                            AutoZoom Admin
                        </span>
                    </Typography>
                </div>
                <List className="max-w-2/3 pr-[10%] ">
                    <ListItem onClick={() => navigate('/')} className="hover:bg-blue-700 text-white hover:text-black w-[100%] " >
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                    <ListItem onClick={() => navigate('/categories')} className="hover:bg-blue-700 text-white hover:text-black w-[100%] " >
                        <ListItemPrefix>
                            <CircleStackIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Categories
                    </ListItem>
                    <ListItem onClick={() => navigate('/brands')} className="hover:bg-blue-700 text-white hover:text-black " >
                        <ListItemPrefix>
                            <BuildingStorefrontIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Brands
                    </ListItem>
                    <ListItem onClick={() => navigate('/modals')} className="hover:bg-blue-700 text-white hover:text-black " >
                        <ListItemPrefix>
                            <NewspaperIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Modals
                    </ListItem>
                    <ListItem onClick={() => navigate('/locations')} className="hover:bg-blue-700 text-white hover:text-black " >
                        <ListItemPrefix>
                            <MapIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Locations
                    </ListItem>
                    <ListItem onClick={() => navigate('/cities')} className="hover:bg-blue-700 text-white hover:text-black " >
                        <ListItemPrefix>
                            <BuildingOffice2Icon className="h-5 w-5" />
                        </ListItemPrefix>
                        Cities
                    </ListItem>
                    <ListItem onClick={() => navigate('/cars')} className="hover:bg-blue-700 text-white hover:text-black " >
                        <ListItemPrefix>
                            <TruckIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Cars
                    </ListItem>
                </List>
            </Card>
            <div className="h-[100vh] w-full max-w-[15rem]"></div>
        </>
    )
}

export default Sidebar