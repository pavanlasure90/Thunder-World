import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider ({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            axios.get('/profile')
                .then(response => {
                    const { email, password } = response.data;
                    setUser({ email, password });
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                    setUser(null); 
                });
        }
    }, [user]); 

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
