// import axios from "axios";
// import React, { useEffect } from "react";
// import useAuth from "./useAuth";
// import { useNavigate } from "react-router";

// const axiosSecure = axios.create({
//   baseURL: "http://localhost:3000",
// });

// const useAxiosSecure = () => {
//   const { user, logOut } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // add a request interceptor
//     const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
//       config.headers.Authorization = `Bearer ${user.accessToken}`;

//       return config;
//     });

//     // add a response interceptor
//     const resInterceptor = axiosSecure.interceptors.response.use(
//       (response) => {
//         return response;
//       },

//       (error) => {
//         const statusCode = error.status;
//         if (statusCode === "401" || statusCode === "403") {
//           logOut().then(() => {
//             navigate("/login");
//           });
//         }

//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       axiosSecure.interceptors.request.eject(reqInterceptor);
//       axiosSecure.interceptors.response.eject(resInterceptor);
//     };
//   }, [user, logOut, navigate]);

//   return axiosSecure;
// };

// export default useAxiosSecure;




import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "https://zap-shift-server-side-alpha.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // add a request interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.accessToken; 
          // const token = await user.getIdToken(); // Firebase token
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    // add a response interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error.response?.status; // fix here
        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
