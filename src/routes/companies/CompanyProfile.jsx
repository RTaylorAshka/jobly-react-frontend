import { NavLink, useParams } from "react-router-dom";
import JoblyApi from "../../helpers/api"
import { useEffect, useState } from "react";
import Error from "../../helpers/Error";
import Loading from "../../helpers/Loading";

function CompanyProfile() {
    //Display company details and links to their job postings

    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const handle = useParams()['handle']

    async function getCompany() {

        let res = await (JoblyApi.getCompanyDetails(handle))
        if ('error' in res) {
            setError(res.error)
        } else {
            setError(null)
            setData(res)

        }

    }

    useEffect(() => {
        getCompany()

    }, [handle])

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

        <div className="content">

            <div className="card max-width max-height">
                <h1>{data.company['name']}</h1>

                <div className="card-outlined">
                    <i>@{data.company['handle']}</i>
                    <p>{data.company['description']}</p>
                </div>


                <div className="card-outlined">
                    <h3>Job postings: </h3>

                    {data.jobs.map(j => <NavLink key={j.id} className={'item '} to={`/jobs/${j.id}`} target="_blank">
                        {j.title}
                    </NavLink>)}
                </div>


            </div>



        </div>

    )
}

export default CompanyProfile;