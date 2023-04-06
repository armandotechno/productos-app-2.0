import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';

export const LoginScreen = () => {
    return (
      <>
        {/* background */}
        <Background />

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

                //TODO: onchange, value

                autoCapitalize="none"
                autoCorrect={ false }
            />

            <Text style={ loginStyles.label }>Contraseña:</Text>
            <TextInput 
                placeholder="******"
                placeholderTextColor="rgba(255,255,255,0.4)"
                underlineColorAndroid="white"
                style={[ 
                    loginStyles.inputField, 
                    ( Platform.OS === 'ios'  ) && loginStyles.inputFieldIOS
                ]}
                selectionColor="white"

                //TODO: onchange, value

                autoCapitalize="none"
                autoCorrect={ false }
            />

            {/* Botón login */}
            <View style={ loginStyles.buttonContainer }>
                <TouchableOpacity
                    activeOpacity={ 0.7 }
                    style={ loginStyles.button }
                >
                    <Text style={ loginStyles.buttonText }>Login</Text>
                </TouchableOpacity>
            </View>

            {/* Crear una nueva cuenta */}
            <View style={ loginStyles.newUserContainer }>
                <TouchableOpacity
                    activeOpacity={ 0.8 }
                    onPress={ () => console.log('Ola')}
                >
                    <Text style={ loginStyles.buttonText }>Nueva cuenta </Text>
                </TouchableOpacity>
            </View>
        </View>
      </>
    )
}
