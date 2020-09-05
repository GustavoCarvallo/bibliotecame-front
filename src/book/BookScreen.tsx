import React from "react";
import {post} from "../utils/http"
import "./Book.css"
import IconButton from "../common/IconButton";

const BookScreen = () => {

    const activate = (id: number) => {
        post("book/"+id+"/activate",[],).then( () => {
                alert("Book " + id + " activated!");
            }
        ).catch(error => {
            alert("Got error: "+ error.status)
        })
    }

    const deactivate = (id: number) => {
        post("book/"+id+"/deactivate",[],).then( () => {
                alert("Book " + id + " deactivated!");
            }
        ).catch(error => {
            alert("Got error: "+ error.status)
        })
    }

    return <div>
        <IconButton icon={"far fa-check-circle"} onClick={() => activate(1)}/>
        <IconButton icon={"fas fa-ban"} onClick={() => deactivate(2)}/>
    </div>

    //Aca debería ir la vista del libro
}
export default BookScreen;