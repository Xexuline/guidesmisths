import { http } from './'
import { store } from '../../store'
import { setLoading } from '../../store/ui/actions'

function loader(state) {
  store.dispatch(setLoading(state))
}

export default function setup() {
  http.interceptors.request.use(async config => {
    loader(true)
    return config
  }, (err) => {
    loader(false)
    return Promise.reject(err)
  })
  http.interceptors.response.use((c) => {
    loader(false)
    return c
  }, (err) => {
    loader(false)
    return Promise.reject(err)
  })
}