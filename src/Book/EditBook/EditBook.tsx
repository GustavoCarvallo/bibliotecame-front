import React, {useState} from 'react';
import {Book, Copy, EDIT} from "../Book";
import CreateOrEditBook from "../CreateOrEditBook";
import {put} from "../../utils/http";
import CreateCopyModal from "../CreateCopy/CreateCopyModal";
import ActivateDeactivateCopyModal from "../ActivateDeactivateCopy/ActivateDeactivateCopyModal";
import {toast,ToastOptions} from "react-toastify";
import "./EditBook.css"

type Props = {
    selectedBook: Book,
    setSelectedBook: Function,
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
        put(`book/${book.id}`, book)
            .then(() => {
                thenCallback()
                props.handleCancel();

            })
            .catch((error) => {
                    catchCallback(error);
            })
    }

    const openNewCopyModal = () => {
        setOpenNewCopy(true);
        setNewCopyError(false);
    }

    const closeNewCopyModal = () => {
        setOpenNewCopy(false);
    }

    const onCreateCopySuccess = (copy: Copy) => {
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
            active: props.selectedBook.active,
            reviews: props.selectedBook.reviews,
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
    }

    const toastifyConfiguration: ToastOptions = {
        className: "in-toast"
    }

    const notifyError = (message: string) => {
        toast.dismiss();
        toast.error(message, toastifyConfiguration);
    }


    return (
        <div className={"edit-book"}>
            <CreateCopyModal isOpen={openNewCopy} onClose={closeNewCopyModal}
                             book={props.selectedBook}
                             onSuccess={onCreateCopySuccess}
                             onError={onCreateCopyError}/>
            <ActivateDeactivateCopyModal isOpen={openActivateDeactivateCopyModal} onClose={closeActivateDeactivateCopy}
                                         copy={selectedCopy}
                                         onSuccess={onActivateDeactivateCopySuccess} onError={onActivateDeactivateCopyError}
                                         isActive={openAsActivate}/>
            <CreateOrEditBook handleCancel={props.handleCancel}
                              type={EDIT} handleSubmit={handleSubmit}
                              book={props.selectedBook}
                              setBook={props.setSelectedBook}
                              newCopyError={newCopyError}
                              openNewCopyModal={openNewCopyModal}
                              activateCopy={activateCopy}
                              deactivateCopy={deactivateCopy}
                              successMessage={'El libro se ha modificado exitosamente.'}/>
        </div>
    )
}

export default EditBook;
