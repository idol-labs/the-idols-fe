import React, { createContext, useState } from 'react';

export const NavContext = createContext();

const NavContextProvider = (props) => {
    const [navShow, setNavShow] = useState(false)
    const [isHomePage, setIsHomePage] = useState(window.location.pathname === '/')

    return (
        <NavContext.Provider value={{ 
            navShow,
            setNavShow,
            isHomePage,
            setIsHomePage
        }}>
            {props.children}
        </NavContext.Provider>
    )
}


export default NavContextProvider;