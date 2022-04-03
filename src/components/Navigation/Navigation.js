import { NavLink } from "react-router-dom";                

export default function Navigation({ to, where }) {
    return (
        <NavLink
            className={({ isActive }) =>
                isActive ? "navigation active" : "navigation inactive"
            }
            to={to}
        >   {where}
        </NavLink>
    );
}

