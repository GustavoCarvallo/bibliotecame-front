import React from 'react';
import {post, put} from "../../utils/http";
import {Profile, EDIT} from "../Profile";
import EditProfile from "../EditProfile";

type Props = {
    selectedProfile: Profile,
    setSelectedProfile: Function,
    setSuccess: Function,
    handleCancel: ()=>void,}

const EditProfileSubmitHandler = (props: Props) => {

    const handleSubmit = (profile: Profile, thenCallback: Function, catchCallback: Function) => {

        put(`user/${props.selectedProfile.id}/update`, props.selectedProfile)
            .then(res => {

                post("auth/", {
                        email: profile.email,
                        password: profile.password
                    },
                    {headers: {"Content-Type": "application/json"}, noAuth: true})

                    .then(res => {
                        localStorage.setItem('token', res.accessToken.token);
                        localStorage.setItem('admin', res.admin);
                        localStorage.setItem('fullName', res.fullName);
                    })
                    .catch((error) => {
                        catchCallback(error);
                })
                thenCallback()
            })
            .catch((error) => {
                    catchCallback(error);
            })    }

    return (
        <>
            <EditProfile handleCancel={props.handleCancel}
                         setSuccess={props.setSuccess}
                         type={EDIT} handleSubmit={handleSubmit}
                         profile={props.selectedProfile}
                         setProfile={props.setSelectedProfile}/>
        </>
    )
}

export default EditProfileSubmitHandler;
