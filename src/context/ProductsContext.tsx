import { createContext, useState } from 'react';
import { Producto } from '../interfaces/appInterfaces';

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProducts:  ( categoryId: string, productName: string ) => Promise<void>;
    updateProducts:  ( categoryId: string, productName: string, productId: string ) => Promise<void>;
    deleteProducts:  ( id: string ) => Promise<void>;
    loadProductById:  ( id: string ) => Promise<Producto>;
    uploadImage: ( data: any, id: string ) => Promise<void>
}

const ProductsContext = createContext({} as ProductsContextProps);


export const ProductsProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const [ products, setProducts ] = useState<Producto[]>([])

    const loadProducts = async() => {

    }
    const addProducts = async( categoryId: string, productName: string ) => {

    }
    const updateProducts = async( categoryId: string, productName: string, productId: string ) => {

    }
    const deleteProducts = async( id: string ) => {

    }
    const loadProductById = async( id: string ) => {
        throw new Error('Not Implemented')
    }
    const uploadImage = async( data: any, id: string ) => {

    }

    return (
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProducts,
            updateProducts,
            deleteProducts,
            loadProductById,
            uploadImage,
        }}>
            { children }
        </ProductsContext.Provider>
    )
}