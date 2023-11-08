import JoblyApi from "../../helpers/api";
import { useInputHandler } from "../../hooks/formHooks";
import { useState } from "react";
import Error from "../../helpers/Error";
import { useNavigate } from "react-router-dom";

function SignupForm({ setUser }) {
    //Displays signup form for user

    const INITIAL_VALUES = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    }
    const navigate = useNavigate()
    const [input, handleInput] = useInputHandler(INITIAL_VALUES)
    const [error, setError] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()
        const res = await JoblyApi.registerUser(input)
        console.log(res)
        if ('error' in res) {
            setError(res.error)
        } else {
            setError(null)
            const newUser = {
                username: input.username,
                token: res.token
            }
            setUser(newUser)
            navigate('/profile')
        }
    }

    if (error) {
        if ((error['status'] !== 400))
            return (
                <Error msg={error.message} stat={error.status} />
            )
    }

    return (
        <div className="content">

            {error ?
                <div className="flex-center">
                    <p className="error">Username taken</p>
                </div> :
                <></>
            }

            <div className="card">

                <h2>Sign up</h2>

                <form onSubmit={handleSubmit} >
                    <label>Username:
                        <input type="text" name="username" onChange={handleInput} value={input.username} />
                    </label>
                    <br />
                    <label>Password:
                        <input type="text" name="password" onChange={handleInput} value={input.password} />
                    </label>
                    <br />
                    <label>First Name:
                        <input type="text" name="firstName" onChange={handleInput} value={input.firstName} />
                    </label>
                    <br />
                    <label>Last Name:
                        <input type="text" name="lastName" onChange={handleInput} value={input.lastName} />
                    </label>
                    <br />
                    <label>Email:
                        <input type="text" name="email" onChange={handleInput} value={input.email} />
                    </label>
                    <br />
                    <button>Submit</button>
                </form>
            </div>


        </div>
    )
}

export default SignupForm;