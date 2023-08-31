import axios, { AxiosError, AxiosResponse } from 'axios'
// import * as Sentry from '@sentry/nextjs'

const axiosInstanceClient = axios.create()

axiosInstanceClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error: AxiosError): Promise<AxiosError> => {
    // Sentry.captureException(error)
    return Promise.reject(error)
  }
)

axiosInstanceClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response
  },
  (error: AxiosError): Promise<AxiosError> => {
    // Sentry.captureException(error)
    return Promise.reject(error)
  }
)

export default axiosInstanceClient
