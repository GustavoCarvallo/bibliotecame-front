import React from "react";
import {post} from "../utils/http"
import "./BookScreen.css"
import IconButton from "../common/IconButton";
import ModalComponent from "../common/Modal";
import {toast, ToastOptions} from "react-toastify";

const BookScreen = () => {

    const [bookIsActive,setIsActive] = React.useState(false);

    const activate = (id: number) => {
        setIsActive(true);

        post(`book/${id}/activate`,[],).then( () => {
                notifySuccess(`Libro habilitado satisfactoriamente!`);
            }
        ).catch((error) => {
            error.then((e:any)=>{
                notifyError(e);
            });
        })
    }

    const deactivate = (id: number) => {
        setIsActive(false);
        post(`book/${id}/deactivate`,[],).then( () => {
            notifySuccess(`Libro deshabilitado satisfactoriamente!`);
            }
        ).catch((error) => {
                notifyError(error);
        })
    }

    const toastifyConfiguration: ToastOptions = {
        className: "in-toast"
    }

    const notifySuccess = (message: String) => {
        toast.dismiss()
        toast.success(message, toastifyConfiguration)
    }

    const notifyError = (message: String) => {
        toast.dismiss()
        toast.error(message, toastifyConfiguration)
    }



    return <div className={"book-screen"}>
        {bookIsActive ?
            (<ModalComponent title={"Deshabilitar Libro"} text={"¿Estas seguro que quieres deshabilitar el libro?\n" +
            "\n" +
            "Ten en cuenta que el libro dejará de ser visible\n" +
            "para los usuarios alumnos.\n"} onClick={()=>deactivate(2)} button={<IconButton icon={"fas fa-ban"} onClick={()=>{}}/>}/>)
            :
            (<ModalComponent title={"Habilitar Libro"} text={"¿Estas seguro que quieres habilitar el libro?\n" +
            "\n" +
            "Ten en cuenta que el libro pasará a ser visible\n" +
            "para los usuarios alumnos.\n"} onClick={()=>activate(1)} button={<IconButton icon={"far fa-check-circle"} onClick={()=>{}}/>}/>)
        }
    </div>
}
export default BookScreen;
