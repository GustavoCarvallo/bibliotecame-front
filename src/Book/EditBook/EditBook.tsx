import React, {useState} from 'react';
import {Book, Copy, EDIT} from "../Book";
import CreateOrEditBook from "../CreateOrEditBook";
import {put} from "../../utils/http";
import CreateCopyModal from "../CreateCopy/CreateCopyModal";
import ActivateDeactivateCopyModal from "../ActivateDeactivateCopy/ActivateDeactivateCopyModal";
import {toast, ToastContainer, ToastOptions} from "react-toastify";
import "./EditBook.css"

type Props = {
    selectedBook: Book,
    setSelectedBook: Function,
    setSuccess: Function,
    handleCancel: ()=>void,
}

const EditBook = (props: Props) => {

    const [openNewCopy, setOpenNewCopy] = useState<boolean>(false);
    const [newCopyError, setNewCopyError] = useState<boolean>(false);

    const [openActivateDeactivateCopyModal, setOpenActivateDeactivateCopyModal] = useState<boolean>(false);
    const [openAsActivate, setOpenAsActivate] = useState<boolean>(false)
    const [selectedCopy, setSelectedCopy] = useState<Copy>({
        id: ""
    });

    const handleSubmit = (book: Book, thenCallback: Function, catchCallback: Function) => {
        put(`book/${book.id}`, book, {headers: {"Content-Type": "application/json"}})
            .then(res => thenCallback())
            .catch(err => catchCallback(err.status));
    }

    const openNewCopyModal = () => {
        setOpenNewCopy(true);
        setNewCopyError(false);
        props.setSuccess(false);
    }

    const closeNewCopyModal = () => {
        setOpenNewCopy(false);
    }

    const onCreateCopySuccess = (copy: Copy) => {
        // props.setSuccess(true, "Ejemplar añadido satisfactoriamente");
        addCopy(copy);
    }

    const onCreateCopyError = () => {
        setNewCopyError(true);
    }

    const addCopy = (copy: Copy) => {
        const previousCopies = props.selectedBook.copies?.splice(0) ?? [];
        previousCopies.push(copy);
        previousCopies.sort((a,b)=> a.id > b.id ? 1 : -1)
        props.setSelectedBook({...props.selectedBook, copies: previousCopies})
    }

    const updateCopies = (copy:Copy) => {
        const previousCopies = props.selectedBook.copies?.slice(0) ?? [];
        let newCopies = previousCopies.filter(item => item.id !== copy.id)
        newCopies.push(copy);
        newCopies.sort((a,b)=> a.id > b.id ? 1 : -1)
        props.setSelectedBook({
            id:props.selectedBook.id,
            title: props.selectedBook.title,
            author: props.selectedBook.author,
            year: props.selectedBook.year,
            publisher: props.selectedBook.publisher,
            tags: props.selectedBook.tags,
            copies: newCopies})
    }

    const activateCopy = (copy : Copy) => {
        setSelectedCopy(copy);
        setOpenActivateDeactivateCopyModal(true);
        setOpenAsActivate(true);
    }

    const deactivateCopy = (copy : Copy) => {
        setSelectedCopy(copy);
        setOpenActivateDeactivateCopyModal(true);
        setOpenAsActivate(false);
    }

    const closeActivateDeactivateCopy = () => {
        setOpenActivateDeactivateCopyModal(false);
    }

    const onActivateDeactivateCopyError = () => {
        notifyError("No se puede cambiar el estado del ejemplar porque se encuentra reservado")
    }
    const onActivateDeactivateCopySuccess = (copy:Copy) => {
        updateCopies(copy);
        // commented because the copy changes the state when the book form is submit.
        //notifySuccess("Se cambio el estado del ejemplar satisfactoriamente")
    }

    const toastifyConfiguration: ToastOptions = {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    }

    const notifyError = (message: string) => toast.error(message, toastifyConfiguration);

    const notifySuccess = (message: string) => toast.success(message, toastifyConfiguration);


    return (
        <div className={"edit-book"}>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false}
                            closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover
            />
            <CreateCopyModal isOpen={openNewCopy} onClose={closeNewCopyModal}
                             book={props.selectedBook}
                             onSuccess={onCreateCopySuccess}
                             onError={onCreateCopyError}/>
            <ActivateDeactivateCopyModal isOpen={openActivateDeactivateCopyModal} onClose={closeActivateDeactivateCopy}
                                         copy={selectedCopy}
                                         onSuccess={onActivateDeactivateCopySuccess} onError={onActivateDeactivateCopyError}
                                         isActive={openAsActivate}/>
            <CreateOrEditBook handleCancel={props.handleCancel}
                              setSuccess={props.setSuccess}
                              type={EDIT} handleSubmit={handleSubmit}
                              book={props.selectedBook}
                              setBook={props.setSelectedBook}
                              newCopyError={newCopyError}
                              openNewCopyModal={openNewCopyModal}
                              activateCopy={activateCopy}
                              deactivateCopy={deactivateCopy}/>
        </div>
    )
}

export default EditBook;
