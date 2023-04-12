import { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import { ProductsStackParams } from '../navegation/ProductsNavigator';
import { ProductsContext } from '../context/ProductsContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {};

export const ProductsScreen = ( { navigation }: Props ) => {

  const [ refreshing, setRefreshing ] = useState( false );
    const { products, loadProducts } = useContext( ProductsContext ) 
    const { logOut } = useContext( AuthContext );

    const { top } = useSafeAreaInsets();

    useEffect(() => {

      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            activeOpacity={ 0.7 }
            style={{ marginRight: 10 }}
            onPress={ () => navigation.navigate('ProductScreen', {}) }
          >
            <Text>Agregar</Text>
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <TouchableOpacity
            activeOpacity={ 0.7 }
            style={{ marginLeft: 10, marginRight: 40 }}
            onPress={ logOut }
          >
            <Text>Cerrar Sesión</Text>
          </TouchableOpacity>
        ),
      })

    }, [])

    const loadProductsFromBackend = async() => {
        setRefreshing(true);
        loadProducts()
        setRefreshing(false);
    }

    return (
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        
        <FlatList 
            data={ products }
            keyExtractor={ p => p._id }
            showsVerticalScrollIndicator={ false }

            renderItem={ ({ item }) =>  (
              <TouchableOpacity
                activeOpacity={ 0.7 }
                onPress={ 
                  () => navigation.navigate('ProductScreen', {
                    id: item._id,
                    name: item.nombre
                  }) 
                }
              >
                <Text style={ styles.productName }>{ item.nombre }</Text>
              </TouchableOpacity>
            )}

            ItemSeparatorComponent={ () =>  (
              <View style={ styles.itemSeparator} />
            )}

            refreshControl={ 
              <RefreshControl 
                  refreshing={ refreshing }
                  onRefresh={ loadProductsFromBackend }   
                  progressViewOffset={ 10 }
              />
             }
        />
      </View>

      
    )
}

const styles = StyleSheet.create({
    productName: {
      fontSize: 20,
    },
    itemSeparator: {
      borderBottomWidth: 2,
      marginVertical: 5,
      borderBottomColor: 'rgba(0,0,0,0.1)'
    }
});
