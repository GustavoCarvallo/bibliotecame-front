import React from 'react';
import GenericModal from "../../common/GenericModal/GenericModal";
import TagContainer from "../../common/TagContainer/TagContainer";
import {SearchForm} from "../SearchBook/SearchBook";
import {Tag} from "../Book";
import './AdvancedSearch.css'
import CreateAndCancelButtons from "../../common/Buttons/CreateAndCancelButtons/CreateAndCancelButtons";

type Props = {
    isOpen: boolean,
    onClose: () => void,
    onCancel: () => void,
    searchForm: SearchForm,
    changeSearchForm: (s: SearchForm) => void,
    setDone: (b: boolean) => void
}

const AdvancedSearch = (props: Props) => {

    const [tagToAdd, setTagToAdd] = React.useState<Tag>({
        name: "",
    });

    const addTag = (tag: Tag) => {
        if (tag.name !== "") {
            props.changeSearchForm({
                ...props.searchForm,
                tags: [...props.searchForm.tags, tag],
            });
            setTagToAdd({name: ""});
        }
    }

    const deleteTag = (tagToDelete: Tag) => {
        props.changeSearchForm({
            ...props.searchForm,
            tags: props.searchForm.tags.splice(0).filter(tag => tag.name !== tagToDelete.name)
        })
    }

    return (
        <GenericModal isOpen={props.isOpen} onClose={props.onClose} title={'Búsqueda Avanzada'} withHeader>
            <div className={'book-advanced-search-container'}>
                <div className={'form'}>
                    <div className={'input-container'}>
                            <input className={"input"} placeholder={"Editorial"} value={props.searchForm.publisher}
                                   onChange={event => props.changeSearchForm({...props.searchForm, publisher: event.target.value})}/>
                    </div>

                    <div className={'input-container'}>
                            <input className={"input"} placeholder={"Autor"} value={props.searchForm.author}
                                   onChange={event => props.changeSearchForm({...props.searchForm, author: event.target.value})}/>
                    </div>

                    <div className={'input-container'}>
                            <input className={"input"} placeholder={"Año"} value={props.searchForm.year}
                                   onChange={event => props.changeSearchForm({...props.searchForm, year: event.target.value})}/>
                    </div>

                    <div className={'input-container'}>
                        <div className={'tag-input-box'}>
                            <TagContainer tags={props.searchForm.tags} deleteTag={deleteTag} />
                            <input className={"input"} placeholder={props.searchForm.tags.length === 0? "Tag/s" : ""} value={tagToAdd.name}
                                   onKeyUp={event => {
                                       if (event.key === 'Enter'){
                                           addTag(tagToAdd);
                                       }
                                   }}
                                   onChange={event => setTagToAdd({name: event.target.value})}/>
                        </div>
                        <i className="fas fa-plus icon" onClick={() => addTag(tagToAdd)}/>
                    </div>
                </div>
                <CreateAndCancelButtons onCreate={() =>{
                    props.setDone(true);
                    props.onClose()
                }} onCancel={props.onCancel} createLabel={"Buscar"} isActivated={props.searchForm.title !== "" ||
                                                                                props.searchForm.author !== "" ||
                                                                                props.searchForm.publisher !=="" ||
                                                                                props.searchForm.year !== "" ||
                                                                                props.searchForm.tags.length !==0}/>
            </div>
        </GenericModal>
    )
}

export default AdvancedSearch;