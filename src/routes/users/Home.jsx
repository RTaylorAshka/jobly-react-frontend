import { useInputHandler } from "../../hooks/formHooks";
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import logo from "../jobly-logo.svg"

function Home() {
    //Displays homepage of jobly. Can search titles of both jobs and companies from here or link to their pages without searching.

    const INITIAL_VALUES = {
        query: '',
        searching: 'jobs'
    }

    const searchOptions = ['jobs', 'companies']
    const navigate = useNavigate()
    const [input, handleInput] = useInputHandler(INITIAL_VALUES)


    function handleSubmit(e) {
        e.preventDefault()
        navigate(`/${input.searching}?${input.searching == 'jobs' ? 'title' : 'name'}=${input.query}`)

    }

    return (
        <div className="content home">
            <div>
                <img className="logo" src={logo} />
            </div>


            <div>
                <form method="get" action="/jobs" onSubmit={handleSubmit}>
                    <div className="flex-row">
                        <select value={input.searching} onChange={handleInput} name="searching">
                            {searchOptions.map((i) => <option key={i} value={i}>{i}</option>)}
                        </select>
                        <input type="text" name="query" onChange={handleInput} value={input.query} />
                        <button>Search</button>
                    </div>


                </form>
                <div className="flex-row">
                    <NavLink className='nav' to={'/jobs'}>
                        <span className="material-icons">
                            search
                        </span>
                        All Jobs
                    </NavLink>

                    <NavLink className='nav' to={'/companies'}>
                        <span className="material-icons">
                            search
                        </span>
                        All Companies
                    </NavLink>
                </div>
            </div>



        </div>
    )
}

export default Home;