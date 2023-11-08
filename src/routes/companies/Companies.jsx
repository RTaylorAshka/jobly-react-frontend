import { useEffect, useState } from "react"
import JoblyApi from "../../helpers/api"
import { useInputHandler } from "../../hooks/formHooks";
import Company from "./Company";
import Error from "../../helpers/Error";
import Loading from "../../helpers/Loading";


function Companies() {
    //Companies page. Has search bar and results link to company profiles.

    //If search params in url, set search bar to contain the query
    const params = new URLSearchParams(location.search);
    const INITIAL_VALUES = {
        name: (params.get('name') || '')
    }

    const [error, setError] = useState(null)
    const [input, handleInput] = useInputHandler(INITIAL_VALUES)
    const [data, setData] = useState(null)

    async function getCompanies() {
        //Fetching search results in database. If error received, set error value. Else set error to null and set data value.
        let res = await (input ? JoblyApi.getcompaniesBySearch(input) : JoblyApi.getAllCompaines())
        if ('error' in res) {
            setError(res.error)
        } else {
            setError(null)
            setData(res)

        }

    }


    useEffect(() => {
        getCompanies()
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        getCompanies()
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

            <div className="flex-row max-width">
                <form className="flex-grow-s card" method="get" onSubmit={handleSubmit} >
                    <input type="text" name="name" onChange={handleInput} value={input.name} placeholder="Search Companies" />
                    <button>Search</button>

                </form>

                <div className="flex-grow-l card">



                    {!data.companies[0] ?

                        <div className="card ">
                            <h3>{`No results found`}</h3>
                        </div>

                        :
                        <>

                            <div className="search">{data.companies.map(d => <Company key={d.handle} data={d} />)}</div>



                        </>
                    }


                </div>


            </div>

        </div>


    )
}

export default Companies;