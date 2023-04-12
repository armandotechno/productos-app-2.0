import { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AxiosError } from 'axios';
import cafeApi from '../api/cafeApi';

import { Usuario, LoginResponse, LoginData, RegisterData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';
// import { checkToken } from '../helpers/checkToken';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    singUp: ( resgisterData: RegisterData) => void;
    singIn: ( loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

export type AuthErrorResponse = {
    errors: [{ msg: string }];
    msg: string; 
}

export const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}


export const AuthContext = createContext({} as AuthContextProps);


export const AuthProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const [ state, dispatch ] = useReducer( authReducer, authInitialState );

    useEffect(() => {

        // AsyncStorage.getItem('token')
        //     .then( token => {
        //         console.log({ token });
        //     }).catch( err => {
        //         console.log({ err });
        //     })

        checkToken()
    },[])

    const checkToken = async() => {
        
        const token = await AsyncStorage.getItem('token')
        // No token, no autenticado
        if ( !token ) return dispatch({ type: 'notAuthenticated' })

        // Si hay token
        const resp = await cafeApi('/auth')
        if ( resp.status !== 200 ) {
            return dispatch({ type: 'notAuthenticated' })
        }

        await AsyncStorage.setItem('token', resp.data.token)
        dispatch({ 
            type: 'signUp', 
            payload: {
                token: resp.data.token,
                user: resp.data.usuario
            }
        });  
    }

    const singUp = async( { correo, nombre, password }: RegisterData ) => {
        try {
            
            const resp = await cafeApi.post<LoginResponse>('/usuarios', { correo, nombre, password });
            dispatch({
                type: 'signUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.usuario
                }
            });
            
            await AsyncStorage.setItem('token', resp.data.token)

        } catch (error) {
            const err = error as AxiosError<AuthErrorResponse>
            dispatch({
                type: 'addError',
                payload: err.response?.data.errors[0].msg || 'Revise la información'
            })
        }
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
            
            await AsyncStorage.setItem('token', resp.data.token)

        } catch (error) {

            const err = error as AxiosError<AuthErrorResponse>
            dispatch({
                type: 'addError',
                payload: err.response?.data.msg || 'Información incorrecta'
            })
        }

    }
    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' })
    }
    
    const removeError = () => {
        dispatch({ type: 'removeError' })
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
