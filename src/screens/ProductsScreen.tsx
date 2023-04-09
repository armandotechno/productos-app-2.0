import { useContext } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ProductsContext } from '../context/ProductsContext';

export const ProductsScreen = () => {

    const { products, loadProducts } = useContext( ProductsContext ) 

    return (
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        
        <FlatList 
            data={ products }
            keyExtractor={ p => p._id }
            showsVerticalScrollIndicator={ false }

            renderItem={ ({ item }) =>  (
              <TouchableOpacity
                activeOpacity={ 0.7 }
              >
                <Text style={ styles.productName }>{ item.nombre }</Text>
              </TouchableOpacity>
            )}

            ItemSeparatorComponent={ () =>  (
              <View style={ styles.itemSeparator} />
            )}
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
