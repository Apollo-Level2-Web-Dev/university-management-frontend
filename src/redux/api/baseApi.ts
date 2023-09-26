import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery'
import { getBaseUrl } from '@/helpers/config/envConfig'
import { createApi } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
    endpoints: () => ({}),
  tagTypes: ['user']
})
