import { Text, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, Alert, ScrollView, Dimensions } from 'react-native';

import { useFormik, Formik } from 'formik';
import * as Yup from 'yup';

import { loginStyles } from '../theme/loginTheme';
import { WhiteLogo } from '../components/WhiteLogo';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ErrorMessage } from '../components/ErrorMessage';

interface Props extends StackScreenProps<any,any> {}

const { height } = Dimensions.get('screen')

export const RegisterScreen = ({ navigation }: Props ) => {

    const { singUp, errorMessage, removeError } = useContext( AuthContext );

    // const { email, password, name, onChange } = useForm({
    //     name: '',
    //     email: '',
    //     password: ''
    // });

    useEffect(() => {
        if ( errorMessage.length === 0 ) return;

        Alert.alert( 'Registro Incorrecto', errorMessage, [{
            text: 'Ok',
            onPress: removeError
        }]);

    }, [ errorMessage ])

    const onRegister = () => {
        Keyboard.dismiss();
        // singUp({
        //     nombre: name,
        //     correo: email,
        //     password
        // });
    }

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: ( formValue ) => {
            const { nombre, correo, password } = formValue

            singUp({
                nombre, 
                correo,
                password
            })
        }
    })

    // TODO: Arreglar el espacio en blanco al abrir el teclado
    return (
        <> 
            <ScrollView>
                <KeyboardAvoidingView
                    style={{ flex: 1, backgroundColor: '#5856D6', height }}
                    behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
                >
                    <View style={ loginStyles.formContainer }>
                        {/* keyboard avoid view */}
                        <WhiteLogo />

                        <Text style={ loginStyles.title }>Registro</Text>

                        <Text style={ loginStyles.label }>Nombre:</Text>
                        <TextInput 
                            placeholder="Ingrese su nombre:"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            underlineColorAndroid="white"
                            style={[ 
                                loginStyles.inputField, 
                                ( Platform.OS === 'ios'  ) && loginStyles.inputFieldIOS
                            ]}
                            selectionColor="white"

                            onChangeText={ (text) => formik.setFieldValue("nombre", text) }
                            value={ formik.values.nombre }
                            onSubmitEditing={ onRegister }

                            autoCapitalize="words"
                            autoCorrect={ false }
                        />

                        {
                            ( formik.errors.nombre ) && ( <ErrorMessage message={ formik.errors.nombre } /> )
                        }

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

                            onChangeText={ (text) => formik.setFieldValue("correo", text) }
                            value={ formik.values.correo }
                            onSubmitEditing={ onRegister }

                            autoCapitalize="none"
                            autoCorrect={ false }
                        />

                        {
                            ( formik.errors.correo ) && ( <ErrorMessage message={ formik.errors.correo } /> )
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

                            onChangeText={ (text) => formik.setFieldValue("password", text) }
                            value={ formik.values.password }
                            onSubmitEditing={ onRegister }

                            autoCapitalize="none"
                            autoCorrect={ false }
                        />

                        {
                            ( formik.errors.password ) && ( <ErrorMessage message={ formik.errors.password } /> )
                        }

                        {/* Botón login */}
                        <View style={ loginStyles.buttonContainer }>
                            <TouchableOpacity
                                activeOpacity={ 0.7 }
                                style={ loginStyles.button }
                                onPress={ formik.handleSubmit }
                            >
                                <Text style={ loginStyles.buttonText }>Crear cuenta</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Crear una nueva cuenta */}
                        <TouchableOpacity
                            onPress={ () => navigation.replace('LoginScreen') }
                            activeOpacity={ 0.7 }
                            style={ loginStyles.buttonReturn }
                        >
                            <Text style={ loginStyles.buttonText }>Login</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </>
    )
}

// Formik and Yup
const initialValues = () => {
    return {
        nombre: "",
        correo: "",
        password: "",
    };
  };
  
  const validationSchema = () => {
    return {
        nombre: Yup.string()
            .required("El nombre es obligatorio")
            .min(3, "El nombre tiene que ser mayor a 3 letras"),
        correo: Yup.string()
          .required("El correo es obligatorio")
          .email("Tiene que ser un correo válido"),
        password: Yup.string()
          .required("La contraseña debe ser obligatoria")
          .min(6, "La contraseña debe de tener mínimo 6 caracteres"),
    };
  };
