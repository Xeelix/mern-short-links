import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from "../hooks/http.hook"
import { useParams } from "react-router-dom"
import { AuthContext } from '../context/AuthContext'
import { CircularProgress } from '@material-ui/core'
import LinkCard from '../components/LinkCard'

export const DetailPage = () => {
    const { token } = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [link, setLink] = useState(null);
    const linkId = useParams().id;

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, "GET", null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched);
        } catch (e) {

        }
    }, [token, linkId, request]);

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading) {
        return <CircularProgress />
    }

    return (
        <>
            {!loading && link && <LinkCard link={link} />}
        </>
    )
}
