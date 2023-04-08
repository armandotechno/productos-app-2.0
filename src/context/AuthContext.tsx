import { AxiosError } from 'axios';
import { createContext, useReducer } from 'react';
import cafeApi from '../api/cafeApi';
import { Usuario, LoginResponse, LoginData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    singUp: () => void;
    singIn: ( loginDate: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

type AuthErrorResponse = {
    errors: [{ msg: string }];
    msg: string; 
}

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}


export const AuthContext = createContext({} as AuthContextProps);


export const AuthProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const [ state, dispatch ] = useReducer( authReducer, authInitialState );

    const singUp = () => {

    }
    const singIn = async( { correo, password }: LoginData) => {
        try {
            
            const resp = await cafeApi.post<LoginResponse>('/auth/login', { correo, password } );
            dispatch({ 
                type: 'signUp', 
                payload: {
                    token: resp.data.token,
                    user: resp.data.usuario
                }
            });            

        } catch (error) {
            const err = error as AxiosError<AuthErrorResponse>
            console.log(err.response?.data.msg);
        }
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
