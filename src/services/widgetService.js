import axios from 'axios'

console.log(process.env);
const BASE_URL = process.env.REACT_APP_BASE_URL + "/v1/widgets";
export const fetchAllWidgets = (page,size) => axios.get(BASE_URL,{
    params: {
      page: page,
      size: size,
      sort: false 
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


export const updateWidgetByName=(name,formData)=>axios.patch(BASE_URL + `/${name}`,formData).then((response) =>{
  console.log(formData)
  return response.data;
} )


export const deleteWidgetByName=(name)=>axios.delete(BASE_URL+`/${name}`).then((response) =>{
  return response.data;
} )


export const addWidget=(formData)=>axios.post(BASE_URL,formData).then((response)=>{
  return response.data;
})