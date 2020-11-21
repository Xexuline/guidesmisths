import { http } from '../http'

export class PhoneService {
  static async getList () {
    try {
      return await http.get('/phone')
    } catch (e) {
      console.error(e)
    }
  }

  static async getInfo (id) {
    try {
      return await http.get(`/phone/${id}`)
    } catch (e) {
      console.error(e)
    }
  }

  static async create (id, payload) {
    try {
      return await http.post(`/phone/${id}`)
      
    } catch (e) {
      console.error(e)
    }
  }

  static async update (id, payload) {
    try {
      return await http.put(`/phone/${id}`, payload)
    } catch (e) {
      console.error(e)
    }
  }

  static async remove (id) {
    try {
      return await http.delete(`/phone/${id}`)
    } catch (e) {
      console.error(e)
    }
  }

}