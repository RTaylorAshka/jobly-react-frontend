import { useState } from "react";

function useInputHandler(INITIAL_VALUES) {
    //Handles input updates for forms
    const [input, setInput] = useState(INITIAL_VALUES)

    async function handleInput(e) {


        const { name, value } = e.target;

        //If the input is a checkbox, toggle the current value
        if (e.target.type == "checkbox") {
            await setInput({
                ...input, [name]: !(input[name])
            })

        } else {

            await setInput({
                ...input, [name]: value
            })
        }



    }

    //Passing handleInput for "onChange" event in forms, setInput for more specific cases outside of events
    return [input, handleInput, setInput]
}




export { useInputHandler };