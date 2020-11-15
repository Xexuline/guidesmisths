export class PhoneService {
  static async getList () {
    try {
      const response = await fetch('/phones').then(response => response.json())
      console.log(response)
      
    } catch (e) {
      console.error(e)
    }
  }

  static async getInfo (id) {
    try {
      const response = await fetch(`/phone/${id}`).then(response => response.json())
      console.log(response)
      
    } catch (e) {
      console.error(e)
    }
  }

  static async create (id, payload) {
    try {
      const response = await fetch(`/phone/${id}`, { method: 'POST' }).then(response => response.json())
      console.log(response)
      
    } catch (e) {
      console.error(e)
    }
  }

  static async update (id, payload) {
    try {
      const response = await fetch(`/phone/${id}`, { method: 'PUT' }).then(response => response.json())
      console.log(response)
      
    } catch (e) {
      console.error(e)
    }
  }

  static async remove (id) {
    try {
      const response = await fetch(`/phone/${id}`, { method: 'DELETE' }).then(response => response.json())
      console.log(response)
      
    } catch (e) {
      console.error(e)
    }
  }

}