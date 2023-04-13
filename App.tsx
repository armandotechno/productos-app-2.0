import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navegation/Navigator';
import { AuthProvider } from './src/context/AuthContext';
import { ProductsProvider } from './src/context/ProductsContext';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <AuthProvider>
      <ProductsProvider>
        { children }
      </ProductsProvider>
    </AuthProvider>
  )
}

const App = () => {
    return (
      <Provider store={ store }>
        <NavigationContainer>
          <AppState>
            <Navigator />
          </AppState>
        </NavigationContainer>
      </Provider>
    )
}

export default App;