"use client"

import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import axios from "../service/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CreateBrand = ({ open, handleOpen,  getData, editedData, setEditedData }) => {
    const [values, setValues] = useState({
        title: editedData?.title || '',
        itemId: editedData?.id || '',
        modalTitle: editedData?.modalTitle,
    })
    const [picture, setPicture] = useState(null)

    const [printPic, setPrintPic] = useState(editedData?.image_src || '')

    const inputHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    useEffect(() => {

        return () => {
            setEditedData(null)
        }
    }, [])


    const submitHandler = async (e) => {
        e.preventDefault()


        const postData = new FormData()

        postData.append('title', values.title)
        if (picture) {
            postData.append('images', picture)
        }

        try {
            if (values.modalTitle === 'Edit Brand') {

                const res = await axios.put(`/brands/${values.itemId}`, postData)
                console.log(res);
                toast.success(res?.data?.message, {
                    theme: 'dark'
                })

            } else {
                const res = await axios.post('/brands', postData)
                console.log(res);
                toast.success(res?.data?.message, {
                    theme: 'dark'
                })
            }
            getData()

        } catch (error) {
            console.error(error);
            toast.error(error?.message, {
                theme: 'dark'
            })

        } finally {
            handleOpen()
            setPicture('')
            setValues({
                title: '',
                itemId: '',
            })
            setPrintPic('')
        }

    }

    const pictureHandler = (e) => {
        const pic = e?.target?.files[0]
        setPicture(pic)

        const objectURL = URL.createObjectURL(pic);

        setPrintPic(objectURL);
    }

    return (
        <>

            <Dialog open={open} handler={handleOpen} size="sm" >
                <form onSubmit={submitHandler}>
                    <DialogHeader>{values.modalTitle}</DialogHeader>
                    <DialogBody className="flex flex-col gap-4">
                        <Input label="Name" size="lg" name="title" onChange={inputHandler} value={values.title} required />
                        <div className="flex gap-5">
                            {printPic && <div className=" max-w-80 max-h-40 " ><img src={printPic.includes('blob:') ? printPic : `https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${printPic}`} alt="printPic" /></div>}

                            <label className="w-40 h-40 border-2 flex justify-center items-center ">
                                Upload img
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={pictureHandler}
                                    accept="image/png, image/jpeg"
                                    aria-label="Select image file"
                                />
                            </label>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" type="submit">
                            <span>Submit</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    )
}

export default CreateBrand