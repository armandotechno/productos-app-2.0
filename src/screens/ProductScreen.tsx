import { Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../nagigation/ProductsNavigator';
import { useEffect } from 'react';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {};

export const ProductScreen = ( { route, navigation }: Props) => {

    const {  id, name = '',  } = route.params;

    useEffect(() => {

      navigation.setOptions({
        title: ( name ) ? name : 'Nuevo Producto'
      })

    },[])

    return (
      <View>
        <Text>{ name } { id }</Text>
      </View>
    )
}
