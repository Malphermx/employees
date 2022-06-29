import axios from "axios";


export const token = () =>{
    return window.localStorage.getItem('token');
}

export const config = () =>{
    return { headers: {
        "Content-Type": "application/json",
      }}

}

export const services = (method:string,service:string,body:any) => {

    switch (method) {
        case "GET":
      
            let url  = `https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/${service}`;
            // console.log(url)
            return axios.get(url).then((r:any)=>{
                return response(r)
            }).catch((err:any)=>{
                return response(err.response);
            });

           
        case "POST":

            return axios.post(`https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/${service}`,JSON.stringify(body),config()).then((r)=>{
                return response(r);
            }).catch((err)=>{
                return response(err.response);
            });

           
        case "PUT":
            return axios.put(`${process.env.REACT_APP_RF_API}${service}`,body).then((r)=>{
                return response(r);
            }).catch((err)=>{
                return response(err.response);
            });
            
        case "DELETE":
            return axios.delete(`${process.env.REACT_APP_RF_API}${service}`).then((r)=>{
                return response(r);
            }).catch((err)=>{
                return  response(err.response);
            });

        default:
            break;
    }
}

const response = (r:any) => {
    
    if(r === undefined){
        return false;
    }

    if(r.status === 200 || r.status === 201){
        return {status:r.status, data:r.data}
    }
    return {status:r.status, errors: r.data.error}
} 