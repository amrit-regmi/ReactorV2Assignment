import axios from 'axios'
const baseUrl = 'https://bad-api-assignment.reaktor.com'

export const getProductsByType = async( category,errorMode) => {
  const config={}
  if(errorMode){
    config.headers ={ 'x-force-error-mode':'all' }
  }
  const response = await axios.get(`${baseUrl}/products/${category}`,config)
  return response.data
}

export const getAvailablilityByManufacturer = async( manufacturer,errorMode) => {
  const config={}
  if(errorMode){
    config.headers ={ 'x-force-error-mode':'all' }
  }
  const response = await axios.get(`${baseUrl}/availability/${manufacturer}`,config)
  return response.data
}


export default {  getProductsByType , getAvailablilityByManufacturer }