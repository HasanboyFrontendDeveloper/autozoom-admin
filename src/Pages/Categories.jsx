import {
  Typography,
  Button,
  Card,
  IconButton,
} from "@material-tailwind/react";
import axios from "../service/api";
import { useEffect, useState } from "react";
import { CreateCategory, Loader, UpdateCategory } from "../components";
import { toast } from "react-toastify";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";



const TABLE_HEAD = ["Name", "Job", "Images"];

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [editCategory, setEditCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const [open, setOpen] = useState(false);
  const [openUpdateCategory, setOpenUpdateCategory] = useState(false)

  const handleOpen = () => setOpen(!open);

  const handleOpenUpdateCategory = () => setOpenUpdateCategory(!openUpdateCategory);

  const getCategory = async () => {
    setIsLoading(true)

    try {
      const res = await axios.get('/categories')

      console.log(res?.data?.data);

      setCategories(res?.data?.data)

    } catch (error) {
      console.error(error);

    } finally {
      setIsLoading(false)
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

  const openUpdateModal = (item = null) => {
    handleOpenUpdateCategory()
    setEditCategory(item)
  }

  console.log(editCategory);


  return (
    <div className="bg-gray-100 p-20 min-h-[100vh] ">
      <div className="max-w-7xl mx-auto">


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
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 flex justify-center ">
                  <Button color="light-blue" className="" onClick={handleOpen} >Create Category</Button>
                </th>

              </tr>
            </thead>
            <tbody>
              {categories.map(({ name_en, name_ru, image_src, id }) => (
                <tr key={id} className="even:bg-blue-gray-50/50">
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
                  <td className="p-4 flex justify-center gap-5 ">
                    <IconButton color="red" variant="outlined" onClick={() => deleteCategory(id)} ><TrashIcon className="w-5 h-5" /> </IconButton>
                    <IconButton color="light-blue" onClick={() => openUpdateModal({ name_en, name_ru, image_src, id })} ><PencilSquareIcon className="w-5 h-5" /> </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
          {isLoading && <Loader />}
        </Card>

      </div>

      <CreateCategory open={open} handleOpen={handleOpen} getCategory={getCategory} />
      {openUpdateCategory &&
        <UpdateCategory
          open={openUpdateCategory}
          handleOpen={handleOpenUpdateCategory}
          getCategory={getCategory}
          editCategory={editCategory}
          setEditCategory={setEditCategory}
        />}
      {/* <UpdateCategory open={openUpdateCategory} handleOpen={handleOpenUpdateCategory} getCategory={getCategory} editCategory={editCategory} /> */}
    </div>
  )
}

export default Categories