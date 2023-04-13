import { useContext, useEffect, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import { ErrorMessage } from '../components/ErrorMessage';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {

    const { singIn, errorMessage, removeError } = useContext( AuthContext );

    useEffect(() => {
        if ( errorMessage.length === 0 ) return;

        Alert.alert( 'Login Incorrecto', errorMessage, [{
            text: 'Ok',
            onPress: removeError
        }]);

    }, [ errorMessage ])

    const onLogin = () => {
        Keyboard.dismiss();

    }

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: (formValue) => {
            const { correo, password } = formValue;
            
            singIn({ correo, password })
    
        }
    });

    return (
        <>
            <Background />

            <KeyboardAvoidingView 
                style={{ flex: 1 }}
                behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
            >
                <View style={ loginStyles.formContainer }>

                    <WhiteLogo />

                    <Text style={ loginStyles.title }>Login</Text>

                    <Text style={ loginStyles.label }>Email:</Text>

                    <TextInput
                        placeholder="Ingrese su email:"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        keyboardType='email-address'
                        underlineColorAndroid="white"
                        style={[ 
                            loginStyles.inputField, 
                            ( Platform.OS === 'ios'  ) && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"
                        autoCapitalize="none"
                        autoCorrect={ false }

                        value={formik.values.correo}
                        onChangeText={(text) => formik.setFieldValue("correo", text)}
                        onSubmitEditing={ onLogin }

                    />

                    {
                        ( formik.errors.correo ) && ( <ErrorMessage message={ formik.errors.correo }/> )
                    }

                    <Text style={ loginStyles.label }>Contraseña:</Text>

                    <TextInput
                        placeholder="******"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        secureTextEntry
                        style={[ 
                            loginStyles.inputField, 
                            ( Platform.OS === 'ios'  ) && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"
                        autoCapitalize="none"
                        autoCorrect={ false }

                        value={formik.values.password}
                        onChangeText={(text) => formik.setFieldValue("password", text)}
                        onSubmitEditing={ onLogin }

                    />

                    {
                        ( formik.errors.password ) && ( <ErrorMessage message={ formik.errors.password }/> )
                    }

                    {/* Botón login */}
                    <View style={ loginStyles.buttonContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.7 }
                            style={ loginStyles.button }
                            onPress={ formik.handleSubmit }
                        >
                            <Text style={ loginStyles.buttonText }>Login</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Crear una nueva cuenta */}
                    <View style={ loginStyles.newUserContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            onPress={ () => navigation.replace('RegisterScreen') }
                        >
                            <Text style={ loginStyles.buttonText }>Nueva cuenta </Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

const initialValues = () => {
    return {
      correo: "",
      password: "",
    };
  };
  
  const validationSchema = () => {
    return {
      correo: Yup.string()
        .required("El correo es obligatorio")
        .email("Tiene que ser un correo válido"),
      password: Yup.string()
        .required("La contraseña debe ser obligatoria")
        .min(6, "La contraseña debe de tener mínimo 6 caracteres"),
    };
  };