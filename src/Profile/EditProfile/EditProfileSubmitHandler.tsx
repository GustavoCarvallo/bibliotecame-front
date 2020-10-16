import React from 'react';
import {post, put} from "../../utils/http";
import {Profile, EDIT} from "../Profile";
import EditProfile from "../EditProfile";
import {useHistory} from "react-router-dom";

type Props = {
    selectedProfile: Profile,
    setSelectedProfile: Function,
    handleCancel: ()=>void,}

const EditProfileSubmitHandler = (props: Props) => {

    const history = useHistory();

    const handleSubmit = (profile: Profile, thenCallback: Function, catchCallback: Function) => {

        put(`user/${props.selectedProfile.id}/update`, props.selectedProfile)
            .then(res => {

                localStorage.setItem('fullName',res.firstName + " " + res.lastName);
                history.go(0);

                thenCallback()
            })
            .catch((error) => {
                    catchCallback(error);
            })    }

    return (
        <>
            <EditProfile handleCancel={props.handleCancel}
                         type={EDIT} handleSubmit={handleSubmit}
                         profile={props.selectedProfile}
                         setProfile={props.setSelectedProfile}/>
        </>
    )
}

export default EditProfileSubmitHandler;
