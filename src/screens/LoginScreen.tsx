import { useContext, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useFormik } from 'formik';
import * as Yup from 'yup'

import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {

    const { singIn, errorMessage, removeError } = useContext( AuthContext );

    // const { email, password, onChange } = useForm({
    //     email: '',
    //     password: ''
    // });

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: ( formValue ) => {
        const { email, password } = formValue;

        if ( email !== email || password !== password) {
            if ( errorMessage.length === 0 ) return;

            Alert.alert( 'Login Incorrecto', errorMessage, [{
                text: 'Ok',
                onPress: removeError
        }]);
          } else {
            Keyboard.dismiss();
            onLogin( formValue )
          }

        }
        
    })


    // useEffect(() => {
    //     if ( errorMessage.length === 0 ) return;

    //     Alert.alert( 'Login Incorrecto', errorMessage, [{
    //         text: 'Ok',
    //         onPress: removeError
    //     }]);

    // }, [ errorMessage ])

    const onLogin = ( { email, password } ) => {
        Keyboard.dismiss();

        singIn({ correo: email, password })
    }

    return (
      <>
        {/* background */}
        <Background />

        <KeyboardAvoidingView
            style={{ flex: 1}}
            behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
        >
            <View style={ loginStyles.formContainer }>
                {/* keyboard avoid view */}
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

                    onChangeText={ (value) => formik.setFieldValue(value, 'email') }
                    value={ formik.values.email }
                    onSubmitEditing={ onLogin }

                    autoCapitalize="none"
                    autoCorrect={ false }
                />

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

                    onChangeText={ (value) => formik.setFieldValue(value, 'password') }
                    value={ formik.values.password }
                    onSubmitEditing={ onLogin }

                    autoCapitalize="none"
                    autoCorrect={ false }
                />

                {/* Botón login */}
                <View style={ loginStyles.buttonContainer }>
                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        style={ loginStyles.button }
                        onPress={ onLogin }
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
        email: '',
        password: ''
    }
}

const validationSchema = () => {
    return {
      email: Yup.string()
        .required("El correo es obligatorio")
        .email("Tiene que ser un correo vpalido"),
      password: Yup.string()
        .required("La contraseña debe ser obligatoria")
        .min(6, "La contraseña debe de tener mínimo 6 caracteres"),
    };
  };
