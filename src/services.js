import axios from 'axios'
export const getProductsByType = async( category,errorMode) => {
  const config={}
  if(errorMode){
    config.headers ={ 'x-force-error-mode':'all' }
  }

  const response = await axios.get(`/v2/products/${category}`,config)
  return response.data
}

export const getAvailablilityByManufacturer = async( manufacturer,errorMode) => {
  const config={}
  if(errorMode){
    config.headers ={ 'x-force-error-mode':'all' }
  }
  const response = await axios.get(`/v2/availability/${manufacturer}`,config)
  return response.data
}


export default {  getProductsByType , getAvailablilityByManufacturer }