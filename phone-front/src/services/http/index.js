import axios from 'axios'
import { REACT_APP_API_URL } from '../../config/index.json'

export const http = axios.create({
  baseURL: REACT_APP_API_URL
})
