import { useContext, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {

    const { singIn, errorMessage, removeError } = useContext( AuthContext );

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    });

    useEffect(() => {
        if ( errorMessage.length === 0 ) return;

        Alert.alert( 'Login Incorrecto', errorMessage, [{
            text: 'Ok',
            onPress: removeError
        }]);

    }, [ errorMessage ])

    const onLogin = () => {
        Keyboard.dismiss();

        singIn({ correo: email, password });
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

                    onChangeText={ (value) => onChange(value, 'email') }
                    value={ email }
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

                    onChangeText={ (value) => onChange(value, 'password') }
                    value={ password }
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
