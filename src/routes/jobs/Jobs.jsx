import { useEffect, useState } from "react"
import JoblyApi from "../../helpers/api"
import { useInputHandler } from "../../hooks/formHooks";
import Job from "./Job";
import JobDetails from "./JobDetails";
import Loading from "../../helpers/Loading";
import Error from "../../helpers/Error";

function Jobs({ user }) {
    //Displays job search form and results. Results can be clicked to display job details. Job details show options to apply or to open job in new tab.

    //If search param in url, set title search input.
    const params = new URLSearchParams(location.search);
    const INITIAL_VALUES = {
        title: (params.get('title') || ''),
        minSalary: '0',
        hasEquity: false
    }

    const [error, setError] = useState(null)
    const [input, handleInput] = useInputHandler(INITIAL_VALUES)
    const [data, setData] = useState(null)
    const [viewing, setViewing] = useState(null)

    async function getJobs() {

        let res = await (input ? JoblyApi.getJobsBySearch(input) : JoblyApi.getAllJobs())
        if ('error' in res) {
            setError(res.error)
        } else {
            setError(null)
            setData(res)
            if (res.jobs[0]) {
                setViewing(res.jobs[0]['id'])
            }
        }



    }

    useEffect(() => {
        getJobs()
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        getJobs()
    }

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
            <>

                <div className="flex-row-l max-width">

                    <form className="card flex-grow-s flex-column" method="get" onSubmit={handleSubmit} >
                        <h2>Job Search Options</h2>
                        <div className="flex-row-l">
                            <input type="text" name="title" onChange={handleInput} value={input.title} placeholder="job title" />
                            <button>Search</button>
                        </div>

                        <div className="flex-center">
                            <span className="material-icons">
                                attach_money
                            </span>
                            <input className="input-xs margin-right" type="number" name="minSalary" onChange={handleInput} value={input.minSalary} />

                            <div className="flex-center">
                                <input type="checkbox" id="hasEquity" name="hasEquity" onChange={handleInput} checked={input.hasEquity} value="true" />
                                <label htmlFor="hasEquity">Equity</label>
                            </div>
                        </div>





                    </form>

                    {!data.jobs[0] ?

                        <div className="card flex-grow-l">
                            <h3>{`No results found`}</h3>
                        </div>

                        :
                        <div className="card flex-row-l max-width">
                            <div className="search flex-grow-s margin-right">{data.jobs.map(d => <Job key={d.id} handleClick={() => setViewing(d.id)} data={d} />)}</div>


                            <div className="flex-grow-s max-height">
                                {viewing ? <JobDetails sentId={viewing} user={user} /> : <></>}
                            </div>
                        </div>
                    }


                </div>


            </>

        </div>


    )
}

export default Jobs;