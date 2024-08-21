import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import axios from "../service/api";
// import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateCategory = ({ open, handleOpen, getCategory }) => {
    const [values, setValues] = useState({
        name_en: 'hello',
        name_ru: 'hi',
    })
    const [picture, setPicture] = useState('')
    const [printPic, setPrintPic] = useState('')

    const inputHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }


    const submitHandler = async (e) => {
        e.preventDefault()

        const postData = new FormData()

        postData.append('name_en', values.name_en)
        postData.append('name_ru', values.name_ru)
        postData.append('images', picture)


        try {
            const res = await axios.post('/categories', postData)
            console.log(res);
            toast.success(res?.data?.message, {
                theme: 'dark'
            })
            getCategory()

        } catch (error) {
            console.error(error);
            toast.error(error?.message, {
                theme: 'dark'
            })

        } finally {
            handleOpen()
            setPicture('')
            setValues({
                name_en: '',
                name_ru: '',
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

        <Dialog open={open} handler={handleOpen} size="sm" >
            <form onSubmit={submitHandler}>
                <DialogHeader className="text-center">Create Category</DialogHeader>
                <DialogBody className="flex flex-col gap-4">
                    <Input label="Name En" size="lg" name="name_en" onChange={inputHandler} value={values.name_en} required />
                    <Input label="Name ru" size="lg" name="name_ru" onChange={inputHandler} value={values.name_ru} required />
                    <div className="flex gap-5">
                        {printPic && <div className=" max-w-40 max-h-40 " ><img src={printPic} alt="printPic" /></div>}

                        <label className="w-40 h-40 border-2 flex justify-center items-center ">
                            Upload img
                            <input
                                type="file"
                                className="hidden"
                                onChange={pictureHandler}
                                accept="image/png, image/jpeg"
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
    )
}

export default CreateCategory