import axios from 'axios'

// export const axiosInstance=axios.create(
//     {
//         baseURL:"http://localhost:5001/api",
//         withCredentials:true, //To send the cookie to every sent request
//     }
// )


// Specially for Deployment.....(comment above code and use this code)
export const axiosInstance=axios.create(
    {
        baseURL:import.meta.env.MODE==="delvelopment"? "http://localhost:5001/api" : "/api",
        withCredentials:true, //To send the cookie to every sent request
    }
)