import axios from 'axios'
import env from '../utils/config';

const BASE_URL = env[env.SETTING].url + "/v1/widgets";

export const fetchAllWidgets = (page,size) => axios.get(BASE_URL,{
    params: {
      page: page,
      size: size,
      sort: false // Add sorting parameter if needed
    }}).then((response) =>{
    console.log(response)
    return response.data.result;
} )

export const fetchWidgetByName=(name,page,size,sort)=>
    axios.get(BASE_URL+"/search",{
        params: {
        name:name,
          page: page,
          size: size,
          sort: sort // Add sorting parameter if needed
        }}).then((response) => response.data.result)
