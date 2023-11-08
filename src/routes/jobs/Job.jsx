import { NavLink } from "react-router-dom";

function Job({ data, handleClick }) {
    //Acts as a button, setting current job being viewed on the job search page
    return (

        <div className="item" onClick={handleClick}>

            <h2>{data.title}</h2>
            <i>Posted by {data.companyHandle}</i>

        </div>

    )
}

export default Job;