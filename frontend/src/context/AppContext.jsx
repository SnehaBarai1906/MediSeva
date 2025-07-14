import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets";


export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    //const [bookedAppointment, setBookedAppointment] = useState(null); // Add state for bookedAppointment
    const currencysymbol = '$';

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser);
    //     });

    //     return () => unsubscribe();
    // }, []);

    const value = {
        doctors,
        currencysymbol,
        user,
        //bookedAppointment, // Provide bookedAppointment state
        //setBookedAppointment // Provide setBookedAppointment function
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
