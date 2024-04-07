import { useState, createContext, useContext } from "react";
import * as userService from '../Services/userService';
import { toast } from "react-toastify";

const context = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(userService.getUser());
    const login = async (employee, password) => {
        try {
            const user = await userService.login(employee, password);
            setUser(user);

        }
        catch (err) {
            toast.error(err.response.data);
        }
    };

    const register = async data => {
        try {
            const user = await userService.register(data);
            setUser(user);
            toast.success('Registeration Successful');

        } catch (err) {
            toast.error(err.response.data)
        }
    }

    const logout = () => {
        userService.logout();
        setUser(null);
    };
    return (
        <context.Provider value={{user, login, logout, register}}>
            {children}
        </context.Provider>
    );
};

export const useAuth = () => useContext(context);