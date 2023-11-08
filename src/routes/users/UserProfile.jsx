import { useNavigate, NavLink } from "react-router-dom"
import { useState, useEffect } from "react"
import Loading from "../../helpers/Loading"
import Error from "../../helpers/Error"
import JoblyApi from "../../helpers/api"
import { useInputHandler } from "../../hooks/formHooks"

function UserProfile({ user = null }) {
    //Displays user profile, info edit form and links to jobs applied.

    const INITIAL_VALUES = {
        firstName: null,
        lastName: null,
        email: null
    }

    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [input, handleInput, setInput] = useInputHandler(INITIAL_VALUES)
    const [editing, setEdit] = useState(false)
    const navigate = useNavigate()

    async function getUserData() {

        let res = await (JoblyApi.getUser(user))
        if ('error' in res) {
            setError(res.error)
        } else {
            setError(null)
            setData(res)
            setInput({
                firstName: res.user.firstName,
                lastName: res.user.lastName,
                email: res.user.email
            })

        }

    }

    function handleEdit(e) {
        e.preventDefault()
        if (editing) {
            JoblyApi.editUser(user, input)
        }
        setEdit(!editing)

    }

    useEffect(() => {
        user ? getUserData() : navigate('/login')
    }, [user])



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
                <h1>{`${editing == false ? input.firstName : data.user.firstName}'s Profile`}</h1>

                <div className="card-outlined">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label>First Name: <input type="text" name="firstName" value={input.firstName} onChange={handleInput} disabled={!editing} /></label>
                        <label>Last Name: <input type="text" name="lastName" value={input.lastName} onChange={handleInput} disabled={!editing} /></label>
                        <label>Email: <input type="text" name="email" value={input.email} onChange={handleInput} disabled={!editing} /></label>
                        <button onClick={handleEdit}>{editing ? 'Save Changes' : 'Edit'}</button>
                    </form>
                </div>

                <div className="card-outlined">
                    <h3>Applied: </h3>

                    {data.applied.map(j => <NavLink key={j.id} className={'item '} to={`/jobs/${j.id}`} target="_blank">
                        {j.title}
                    </NavLink>)}
                </div>


            </div>

        </div>



    )
}

export default UserProfile;