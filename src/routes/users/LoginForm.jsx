
import { v4 as uuid } from "uuid";
import { useInputHandler } from "../../hooks/formHooks";
import JoblyApi from "../../helpers/api";
import { useState } from "react";
import Error from "../../helpers/Error";
import { useNavigate } from "react-router-dom";

function LoginForm({ setUser }) {
    //Displays login form for users.

    const INITIAL_VALUES = {
        username: '',
        password: ''
    }
    const [input, handleInput] = useInputHandler(INITIAL_VALUES)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        let res = await JoblyApi.loginUser(input)
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
            navigate('/')
        }


    }

    if (error) {
        if ((error['status'] !== 401))
            return (
                <Error msg={error.message} stat={error.status} />
            )
    }

    return (
        <div className="content">

            {error ?
                <div className="flex-center">
                    <p className="error">Incorrect credentials, please check your username/password</p>
                </div> :
                <></>
            }


            <div className="card">
                <h2>Log in</h2>
                <form onSubmit={handleSubmit}>
                    <label>Username:
                        <input type="text" name="username" onChange={handleInput} value={input.username} />
                    </label>
                    <br />
                    <label>Password:
                        <input type="password" name="password" onChange={handleInput} value={input.password} />
                    </label>
                    <br />
                    <button>Submit</button>

                </form>
            </div>



        </div>
    )
}

export default LoginForm;