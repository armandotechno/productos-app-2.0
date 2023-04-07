import { createContext, useReducer } from 'react';
import { Usuario } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';

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

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}


const AuthContext = createContext({} as AuthContextProps);


export const AuthProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const [ state, dispatch ] = useReducer( authReducer, authInitialState );

    const singUp = () => {

    }
    const singIn = () => {

    }
    const logOut = () => {

    }
    const removeError = () => {

    }
    
    return (
        <AuthContext.Provider value={{
            ...state,
            singUp,
            singIn,
            logOut,
            removeError,
        }}>
            { children }
        </AuthContext.Provider>
    )
}
