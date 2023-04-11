import { useEffect, useContext, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../nagigation/ProductsNavigator';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {};

export const ProductScreen = ( { route, navigation }: Props) => {

    const {  id = '', name = '',  } = route.params;

    const [ tempUri, setTempUri ] = useState<string>()

    const { categories } = useCategories();
    const { loadProductById, addProducts, updateProducts, deleteProducts, uploadImage } = useContext( ProductsContext );

    const { _id, nombre, categoriaId, img, form, onChange, setFormvalue } = useForm({
        _id: id,
        categoriaId: '',
        nombre: name,
        img: ''
    })

    useEffect(() => {

      navigation.setOptions({
        title: ( nombre ) ? nombre : 'Nombre del Producto'
      })

    },[ nombre ])

    useEffect(() => {
      loadProduct();
  }, [])

    const loadProduct = async() => {
        if ( id.length === 0 ) return;

        const product = await loadProductById( id );
        setFormvalue({
          _id: id,
          categoriaId: product.categoria._id,
          img: product.img || '',
          nombre
        });
        
    }

    const saveOrUpdate = async() => {
      if ( id.length > 0 ) {
        updateProducts( categoriaId, nombre, id )
      } else {
          const tempCategoriaId = categoriaId || categories[0]._id;
          const newProduct = await addProducts( tempCategoriaId, nombre )
          onChange( newProduct._id, '_id' )
      }
    }

    const takePhoto = async() => {
        const resp = await launchCamera({
          mediaType: 'photo',
          quality: 0.5 // Mitad de la calidad
        });

        if ( resp.didCancel ) return;
        if ( !resp.assets![0].uri ) return;

        setTempUri( resp.assets![0].uri )
        uploadImage( resp, _id );
    }

    const fromGallery = async() => {
        const resp = await launchImageLibrary({
          mediaType: 'photo',
          quality: 0.5 // Mitad de la calidad
        });

        if ( resp.didCancel ) return;
        if ( !resp.assets![0].uri ) return;

        setTempUri( resp.assets![0].uri )
        uploadImage( resp, _id );
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
            selectedValue={ categoriaId }
            onValueChange={( itemValue ) =>
              onChange( itemValue, 'categoriaId')
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
            onPress={ saveOrUpdate }
            style={ styles.btnGuardar }
          >
            <Text style={ styles.btnText }>Guardar</Text>
          </TouchableOpacity>

          {
            ( _id.length > 0 ) && (
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                  <TouchableOpacity
                    activeOpacity={ 0.7 }
                    onPress={ takePhoto }
                    style={{ 
                        ...styles.btnGuardar,
                        backgroundColor: 'blue' 
                  }}
                  >
                    <Text style={ styles.btnText }>Cámara</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={ 0.7 }
                    onPress={ fromGallery }
                    style={{ 
                        ...styles.btnGuardar,
                        backgroundColor: 'orange' 
                  }}
                  >
                    <Text style={ styles.btnText }>Galería</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={ 0.7 }
                    onPress={ () => {
                      deleteProducts( id )
                      navigation.pop()
                    }}
                    style={{ 
                        ...styles.btnGuardar,
                        backgroundColor: 'red' 
                    }}
                  >
                    <Text style={ styles.btnText }>Eliminar</Text>
                  </TouchableOpacity>
                </View>
            )
          }
          

          {
            ( img.length > 0 && !tempUri ) && (
                <Image 
                  source={{ uri: img }}
                  style={{
                    marginTop: 20,
                    width: '100%',
                    height: 300
                  }}
                />
            )
          }

          {/* Mostrar imagen temporal */}
          
          {
            ( tempUri ) && (
                <Image 
                  source={{ uri: tempUri }}
                  style={{
                    marginTop: 20,
                    width: '100%',
                    height: 300
                  }}
                />
            )
          }


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
      width: 110,
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
