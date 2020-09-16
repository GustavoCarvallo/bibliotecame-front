import React from 'react';
import {put} from "../../utils/http";
import {Profile, EDIT} from "../Profile";
import CreateOrEditProfile from "../CreateOrEditProfile";

type Props = {
    selectedProfile: Profile,
    setSelectedProfile: Function,
    setSuccess: Function,
    handleCancel: ()=>void,}

const EditProfile = (props: Props) => {

    const handleSubmit = (profile: Profile, thenCallback: Function, catchCallback: Function) => {
        put(`user/${props.selectedProfile.id}/update`, props.selectedProfile, {headers: {"Content-Type": "application/json"}})
            .then(res => thenCallback())
            .catch(err => catchCallback(err.status));
    }

    return (
        <>
            <CreateOrEditProfile handleCancel={props.handleCancel}
                              setSuccess={props.setSuccess}
                              type={EDIT} handleSubmit={handleSubmit}
                              profile={props.selectedProfile}
                              setProfile={props.setSelectedProfile}/>
        </>
    )
}

export default EditProfile;
