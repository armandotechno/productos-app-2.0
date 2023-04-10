import { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../nagigation/ProductsNavigator';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {};

export const ProductScreen = ( { route, navigation }: Props) => {

    const {  id, name = '',  } = route.params;

    const { categories } = useCategories();
    const { loadProductById } = useContext( ProductsContext );

    const { _id, nombre, categoriaId, img, form, onChange, setFormvalue } = useForm({
        _id: id,
        categoriaId: '',
        nombre: name,
        img: ''
    })

    const [ selectedLanguage, setSelectedLanguage ] = useState();

    useEffect(() => {

      navigation.setOptions({
        title: ( name ) ? name : 'Nuevo Producto'
      })

    },[])

    useEffect(() => {
      loadProduct();
  }, [])

    const loadProduct = async() => {
        if ( id!.length === 0 ) return;

        const product = await loadProductById( id! );
        setFormvalue({
          _id: id,
          categoriaId: product.categoria._id,
          img: product.img || '',
          nombre
        });
        
    }

    return (
      <View style={ styles.container }>

        <ScrollView>

          <Text style={ styles.label }>Nombre del producto:</Text>
          <TextInput  
            placeholder='Producto'
            style={ styles.textInput }
            value={ nombre }
            onChangeText={ (value) => onChange( value, 'nombre')}

          />

          {/* Picker o Selector */}
          <Text>Categoría:</Text>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
            {
              categories.map( cate => (
                <Picker.Item 
                  label={ cate.nombre } 
                  value={ cate._id }
                  key={ cate._id } 
                />
              ))
            }
          </Picker>


          <TouchableOpacity
            activeOpacity={ 0.7 }
            onPress={ () => {}}
            style={ styles.btnGuardar }
          >
            <Text style={ styles.btnText }>Guardar</Text>
          </TouchableOpacity>
          
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <TouchableOpacity
              activeOpacity={ 0.7 }
              onPress={ () => {}}
              style={ styles.btnGuardar }
            >
              <Text style={ styles.btnText }>Cámara</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={ 0.7 }
              onPress={ () => {}}
              style={ styles.btnGuardar }
            >
              <Text style={ styles.btnText }>Galería</Text>
            </TouchableOpacity>
          </View>

          <Text>
            { JSON.stringify( form, null, 5 ) }
          </Text>

        </ScrollView>

      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 10,
      marginHorizontal: 20
    },
    label: {
      fontSize: 18,
      color: 'black'
    },
    textInput : {
      borderWidth: 1, 
      paddingHorizontal: 10, 
      paddingVertical: 5,
      borderRadius: 20,
      borderColor: 'rgba(0,0,0,0.2)',
      height: 45,
      marginTop: 5,
      marginBottom: 15
    },
    btnGuardar: {
      flex: 1,
      width: 140,
      height: 30,
      backgroundColor: 'rgb(129,26,219)',
      borderRadius: 40,
      marginTop: 10,
      marginHorizontal: 10,
      justifyContent: 'center',
      alignSelf: 'center'
    },
    btnText: {
      color: 'white', 
      fontWeight: 'bold', 
      textAlign: 'center'
    }
});
