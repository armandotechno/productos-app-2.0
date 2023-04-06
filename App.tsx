import 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/nagigation/Navigator';

const App = () => {
    return (
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    )
}

export default App;