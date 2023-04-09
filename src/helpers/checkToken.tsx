import AsyncStorage from '@react-native-async-storage/async-storage';
import { useReducer } from 'react';
import { authInitialState } from '../context/AuthContext';
import { authReducer } from '../context/authReducer';

export const checkToken = async() => {

    const [ state, dispatch ] = useReducer( authReducer, authInitialState );

    const token = await AsyncStorage.getItem('token')
    // No token, no autenticado
    if ( !token ) return dispatch({ type: 'notAuthenticated' })
}