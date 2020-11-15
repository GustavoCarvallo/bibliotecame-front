import React, {useEffect} from 'react'
import {put} from "../utils/http";
import {useHistory, useParams} from 'react-router-dom';

const VerifyToken = () => {

    const {token} = useParams();
    const history = useHistory();

    useEffect(() => {
       put(`verify/${token}`, {})
           .then(() => {
               history.push("/login?successfulVerification");
           })
           .catch(() => {
               history.push("/login?unsuccessfulVerification");
           })
    }, [history, token])

    return(<>
        <h1>Loading...</h1>
    </>)
}

export default VerifyToken;