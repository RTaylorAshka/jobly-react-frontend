import { NavLink } from "react-router-dom";

function Company({ data }) {
    //Display link to company page
    return (


        <NavLink to={`/companies/${data.handle}`}>
            <div className="item">
                <h3>{data.name}</h3>
            </div>


        </NavLink>

    )
}

export default Company;