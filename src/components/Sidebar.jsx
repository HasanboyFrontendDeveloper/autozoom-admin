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


import React, { useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
    const [activeBar, setActiveBar] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setActiveBar(location.pathname)
    }, [location])

    console.log(location);


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
                    <ListItem onClick={() => navigate('/')} className={`hover:bg-blue-700 focus:bg-blue-700 focus:bg-opacity-80 active:bg-opacity-80 focus:text-white active:text-white active:bg-blue-700 text-white hover:text-black ${activeBar === '/' && 'bg-blue-700'} `} >
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                    <ListItem onClick={() => navigate('/categories')} className={`hover:bg-blue-700 focus:bg-blue-700 focus:bg-opacity-80 active:bg-opacity-80 focus:text-white active:text-white active:bg-blue-700 text-white hover:text-black ${activeBar === '/categories' && 'bg-blue-700'} `} >
                        <ListItemPrefix>
                            <CircleStackIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Categories
                    </ListItem>
                    <ListItem onClick={() => navigate('/brands')} className={`hover:bg-blue-700 focus:bg-blue-700 focus:bg-opacity-80 active:bg-opacity-80 focus:text-white active:text-white active:bg-blue-700 text-white hover:text-black ${activeBar === '/brands' && 'bg-blue-700'} `} >
                        <ListItemPrefix>
                            <BuildingStorefrontIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Brands
                    </ListItem>
                    <ListItem onClick={() => navigate('/models')} className={`hover:bg-blue-700 focus:bg-blue-700 focus:bg-opacity-80 active:bg-opacity-80 focus:text-white active:text-white active:bg-blue-700 text-white hover:text-black ${activeBar === '/models' && 'bg-blue-700'} `} >
                        <ListItemPrefix>
                            <NewspaperIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Models
                    </ListItem>
                    <ListItem onClick={() => navigate('/locations')} className={`hover:bg-blue-700 focus:bg-blue-700 focus:bg-opacity-80 active:bg-opacity-80 focus:text-white active:text-white active:bg-blue-700 text-white hover:text-black ${activeBar === '/locations' && 'bg-blue-700'} `} >
                        <ListItemPrefix>
                            <MapIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Locations
                    </ListItem>
                    <ListItem onClick={() => navigate('/cities')} className={`hover:bg-blue-700 focus:bg-blue-700 focus:bg-opacity-80 active:bg-opacity-80 focus:text-white active:text-white active:bg-blue-700 text-white hover:text-black ${activeBar === '/cities' && 'bg-blue-700'} `} >
                        <ListItemPrefix>
                            <BuildingOffice2Icon className="h-5 w-5" />
                        </ListItemPrefix>
                        Cities
                    </ListItem>
                    <ListItem onClick={() => navigate('/cars')} className={`hover:bg-blue-700 focus:bg-blue-700 focus:bg-opacity-80 active:bg-opacity-80 focus:text-white active:text-white active:bg-blue-700 text-white hover:text-black ${activeBar === '/cars' && 'bg-blue-700'} `} >
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