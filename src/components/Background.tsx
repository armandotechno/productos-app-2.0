import { Dimensions, View } from 'react-native';

const { height, width } = Dimensions.get('screen')

export const Background = () => {
    return (
      <View 
            style={{ 
                position: 'absolute',
                backgroundColor: '#5856D6',
                top: -550,
                width: width + 400,
                height: height + 800,
                transform: [
                    { rotate: '-70deg' }
                ]
             }}
      />
    )
}
