import axios from 'axios'
import { ProductType } from '../types'

const config:{headers?:{}}={}

export const getProductsByType = async( category: ProductType,errorMode: boolean): Promise<any> => {
  if(errorMode){
    config.headers ={ 'x-force-error-mode':'all' }
  }

  const response = await axios.get(`/v2/products/${category}`,config)
  return response.data
}

export const getAvailablilityByManufacturer = async( manufacturer: string,errorMode: boolean): Promise<any>  => {
  if(errorMode){
    config.headers ={ 'x-force-error-mode':'all' }
  }
  const response = await axios.get(`/v2/availability/${manufacturer}`,config)
  return response.data
}


export default {  getProductsByType , getAvailablilityByManufacturer }