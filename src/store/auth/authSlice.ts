import { createSlice } from "@reduxjs/toolkit";

import { LoginData, RegisterData, Usuario } from "../../interfaces/appInterfaces";

type LoginState = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    // singUp: ( resgisterData: RegisterData ) => void;
    // singIn: ( loginData: LoginData ) => void;
    // logOut: () => void;
    // removeError: () => void;
}

const initialState: LoginState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        singUp: ( state, action ) => {

        },
        signIn: ( state, payload ) => {

        },
        logout: ( state ) => {

        },
        checkingCredentials: ( state ) => {

        },
        removeError: ( state ) => {

        }
    }
})

export const { singUp, signIn, logout, checkingCredentials, removeError } = authSlice.actions;