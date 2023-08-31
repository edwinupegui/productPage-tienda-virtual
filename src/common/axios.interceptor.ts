import axios, { AxiosError } from 'axios'
// import * as Sentry from '@sentry/nextjs'

export default function setupAxios() {
  // Add a request interceptor
  axios.interceptors.request.use(
    (config) => {
      return config
    },
    (error: AxiosError) => {
      // Sentry.captureException(error)
      return Promise.reject(error)
    }
  )

  // Add a response interceptor
  axios.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response
    },
    (error: AxiosError) => {
      // Sentry.captureException(error)
      return Promise.reject(error)
    }
  )
}
