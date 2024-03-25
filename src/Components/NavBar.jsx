import React from "react";
import {useResolvedPath, useMatch, NavLink} from "react-router-dom";

function useIsActive(to) {
    const resolvedPath = useResolvedPath(to);
    return useMatch({ path: resolvedPath.pathname, end: true });
}

const ActiveLink = React.memo(({ to, children, ...props }) => {
    const isActive = useIsActive(to);

    return (
        <li>
            <NavLink
                to={to}
                {...props}
                className={({ isActive }) => isActive ? 'active' : undefined}>
                {children}
            </NavLink>
        </li>
    );
});


export default function NavBar(){
    return(
        <nav className="navbar">
            <ul>
                <ActiveLink to="/">Home</ActiveLink>
                <ActiveLink to="/game">Game</ActiveLink>
                <ActiveLink to="/credits">Credits</ActiveLink>
            </ul>
        </nav>
    )
}