import React from 'react';
import {put} from "../../utils/http";
import {Profile, EDIT} from "../Profile";
import EditProfile from "../EditProfile";

type Props = {
    selectedProfile: Profile,
    setSelectedProfile: Function,
    setFullName: (fullName: string)=>void,
}

const EditProfileSubmitHandler = (props: Props) => {

    const handleSubmit = (profile: Profile, thenCallback: Function, catchCallback: Function) => {

        put(`user/${props.selectedProfile.id}/update`, props.selectedProfile)
            .then(res => {

                localStorage.setItem('fullName',res.firstName + " " + res.lastName);
                props.setFullName(res.firstName + " " + res.lastName);
                thenCallback()
            })
            .catch((error) => {
                    catchCallback(error);
            })    }

    return (
        <>
            <EditProfile type={EDIT} handleSubmit={handleSubmit}
                         profile={props.selectedProfile}
                         setProfile={props.setSelectedProfile}/>
        </>
    )
}

export default EditProfileSubmitHandler;
