"use client"

import {
  Typography,
  Button,
  Card,
  IconButton,
} from "@material-tailwind/react";
import axios from "../service/api";
import { useEffect, useState } from "react";
import { CreateBrand, CreateCategory, Loader, UpdateCategory } from "../components";
import { toast } from "react-toastify";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";



const TABLE_HEAD = ["Name", "Images"];

const Brands = () => {
  const [allData, setAllData] = useState([])
  const [editedData, setEditedData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const [openModal, setOpenModal] = useState(false)


  const handleOpenModal = () => setOpenModal(!openModal);

  const getData = async () => {
    setIsLoading(true)

    try {
      const res = await axios.get('/brands')

      console.log(res?.data?.data);

      setAllData(res?.data?.data)

    } catch (error) {
      console.error(error);

    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const deleteItem = async (id) => {

    console.log(id);


    try {
      const res = await axios.delete(`/brands/${id}`)
      getData()

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

  const openModalHandler = (modalTitle, item = null) => {
    handleOpenModal()
    setEditedData({ ...item, modalTitle })
  }

  console.log(editedData);


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
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4  flex justify-center">
                  <Button color="light-blue" className="" onClick={() => openModalHandler('Create Brand')} >Create Brand</Button>
                </th>

              </tr>
            </thead>
            <tbody>
              {allData.map(({ title, image_src, id }) => (
                <tr key={id} className="even:bg-blue-gray-50/50">
                  <td className="p-4 w-[50%] max-w-[50%] ">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {title}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <img src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${image_src}`} alt="" className="w-24" />
                  </td>
                  <td className="p-4 flex justify-center gap-5 ">
                    <IconButton color="red" variant="outlined" onClick={() => deleteItem(id)} ><TrashIcon className="w-5 h-5" /> </IconButton>
                    <IconButton color="light-blue" onClick={() => openModalHandler('Edit Brand', { title, image_src, id })} ><PencilSquareIcon className="w-5 h-5" /> </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isLoading && <Loader />}

        </Card>

      </div>

      {openModal &&
        <CreateBrand
          open={openModal}
          handleOpen={handleOpenModal}
          editedData={editedData}
          getData={getData}
          setEditedData={setEditedData}

        />}
    </div>
  )
}

export default Brands