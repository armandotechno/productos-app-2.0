import { createContext } from 'react';
import { Usuario } from '../interfaces/appInterfaces';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    singUp: () => void;
    singIn: () => void;
    logOut: () => void;
    removeError: () => void;
}




const AuthContext = createContext({} as AuthContextProps);


export const AuthProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    

    return (
        <AuthContext.Provider value={{

        }}>
            { children }
        </AuthContext.Provider>
    )
}
