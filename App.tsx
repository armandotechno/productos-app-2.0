import 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/nagigation/Navigator';
import { AuthProvider } from './src/context/AuthContext';

const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <AuthProvider>
      { children }
    </AuthProvider>
  )
}

const App = () => {
    return (
      <NavigationContainer>
        <AppState>
          <Navigator />
        </AppState>
      </NavigationContainer>
    )
}

export default App;