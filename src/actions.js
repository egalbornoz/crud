/* Archivo de acciones genericas que puede ser usado desde cualqier ruta de la app y contirnr los metodos estandard
get  add update y delete */
import{firebaseApp} from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'
const db = firebase.firestore(firebaseApp)


// Método para devolver una colección de datos
export const getCollection =async(collection)=>{
    const result = {statusResponse : false, data: null, error : null}
    try {
        const data =  await db.collection(collection).get()
        const arrayData=data.docs.map(doc => ({ id: doc.id, ...doc.data()}))
        result.statusResponse=true
        result.data=arrayData
    } catch (error) {
        result.error=error
        
    }
    return result
}
// Método para agregar un documento a la colección de datos

export const addDocument = async(collection, data) => {
    const result = {statusResponse : false, data: null, error : null}
    try {
        const response = await db.collection(collection).add(data)
        result.data = { id: response.id }
        result.statusResponse = true       
    } catch (error) {
        result.error=error
    }
    return result
}

// Método para obtener un solo documento
export const getDocument = async(collection, id) => {
    const result = {statusResponse : false, data: null, error : null}
    try {
        const response = await db.collection(collection).doc(id).get()
        result.data={ id: response.id,...response.data()}
        result.statusResponse = true       
    } catch (error) {
        result.error=error
    }
    return result
}

// Método para actualizar documento
export const updateDocument = async(collection, id,data) => {
    const result = {statusResponse : false, error : null}
    try {
       
        await db.collection(collection).doc(id).update(data)  
        result.statusResponse=true  
    } catch (error) {
        result.error=error
    }
    return result
}

// Método para eliminar documento
export const deleteDocument = async(collection, id) => {
    const result = {statusResponse : false, error : null}
    try {
        await db.collection(collection).doc(id).delete()  
        result.statusResponse=true  
    } catch (error) {
        result.error=error
    }
    return result
}