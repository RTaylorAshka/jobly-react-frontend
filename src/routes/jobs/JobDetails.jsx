import { NavLink, useNavigate, useParams } from "react-router-dom";
import JoblyApi from "../../helpers/api"
import { useEffect, useState } from "react";
import Loading from "../../helpers/Loading";
import Error from "../../helpers/Error";

function JobDetails({ sentId = null, user }) {
    //Displays job details for both the job search page and the individual job's page. Handles applications to jobly api.

    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [msg, setMsg] = useState(null)
    const id = sentId || useParams()['id']

    async function getJob() {

        if (id) {

            let res = await (JoblyApi.getJobDetails(id))
            console.log(res)
            if ('error' in res) {
                setError(res.error)
            } else {
                setError(null)
                setData(res.job)
                setMsg(null)
            }

        }

    }

    async function handleApply() {

        if (user) {
            let res = await JoblyApi.apply(user, id)
            console.log(res)

            if (!('error' in res)) {
                setMsg("Apllied!")
            }
        } else {
            navigate('/login')
        }


    }

    useEffect(() => {
        getJob()

    }, [id])

    if (error) {
        return (
            <Error msg={error.message} stat={error.status} />
        )
    }
    if (data == null) {
        return (
            <Loading />
        )
    }

    return (

        <div className={!sentId ? "content" : ""}>

            {sentId ?
                <NavLink to={`/jobs/${id}`} target="_blank">
                    <span className="material-icons">
                        open_in_new
                    </span>
                </NavLink> : <></>}

            <div className={!sentId ? "card max-width max-height" : ""}>

                <h2>{data.title}</h2>
                <i>Posted by {<NavLink to={`/companies/${data.companyHandle}`} target="_blank">{data.companyHandle}</NavLink>}</i>
                <p>Salary: {data.salary || "n/a"}</p>
                <p>Equity: {data.equity || "n/a"}</p>
                {msg ? <i>{msg}</i> : <></>}
                <br />
                <button onClick={handleApply} >{user ? "Apply" : "Login to Apply"}</button>


            </div>


        </div>


    )
}

export default JobDetails;