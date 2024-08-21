import {
  Typography,
  Button,
  Card,
  IconButton,
} from "@material-tailwind/react";
import axios from "../service/api";
import { useEffect, useState } from "react";
import { CreateCategory } from "../components";
import { toast } from "react-toastify";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";



const TABLE_HEAD = ["Name", "Job", "Images", ""];

const Categories = () => {
  const [categories, setCategories] = useState([])

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const getCategory = async () => {

        try {
            const res = await axios.get('/categories')

            console.log(res?.data?.data);

            setCategories(res?.data?.data)

        } catch (error) {
            console.error(error);

        }
    }

    useEffect(() => {
        getCategory()
    }, [])

    const deleteCategory = async (id) => {

        console.log(id);


        try {
            const res = await axios.delete(`/categories/${id}`)
            getCategory()

            toast.success(res?.data?.message, {
                theme: 'dark'
            })

        } catch (error) {
            console.error(error);


            toast.error(error?.response?.data?.message, {
                theme: 'dark'
            })
        }
    }

    const updateCategory = async (id) => {
        try {
            const res = await axios.update(`/categories/${id}`)
            getCategory()

            toast.success(res?.data?.message, {
                theme: 'dark'
            })

        } catch (error) {
            console.error(error);


            toast.error(error?.response?.data?.message, {
                theme: 'dark'
            })
        }
    }


    return (
        <div className="bg-gray-100 p-20 ">
            <div className="max-w-7xl mx-auto">



                <div className="pt-10 pb-2 flex justify-end px-5 ">
                    <Button color="green" className="" onClick={handleOpen} >Create Category</Button>
                </div>

                <Card className="h-full w-full overflow-hidden ">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(({ name_en, name_ru, image_src, id }, index) => (
                                <tr key={index} className="even:bg-blue-gray-50/50">
                                    <td className="p-4 w-[35%] max-w-[35%] ">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {name_en}
                                        </Typography>
                                    </td>
                                    <td className="p-4 w-[30%] max-w-[30%] ">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {name_ru}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <img src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${image_src}`} alt="" className="w-28" />
                                    </td>
                                    <td className="p-4">
                                        <IconButton color="red" variant="outlined" onClick={() => deleteCategory(id)} ><TrashIcon className="w-5 h-5" /> </IconButton>
                                        <IconButton color="green" className="ml-5" ><PencilSquareIcon className="w-5 h-5" /> </IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>

            </div>

            <CreateCategory open={open} handleOpen={handleOpen} getCategory={getCategory} />
        </div>
    )
}

export default Categories