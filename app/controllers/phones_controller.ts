import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'

const apiUrl = env.get('API_URL')

export default class PhonesController {
  /**
   * Display a list of resource
   */
  async index({response}: HttpContext) {
    try {
      const res = await fetch(apiUrl)
      if(!res.ok){
        return response.status(res.status).send({
          message: "Error al obtener los datos",
          status: res.status
        })
      }
      const data = await res.json()
      return response.json(data)
    } catch (error) {
      return response.status(500).send({
        message: "Ocurrió un error inesperado.",
        error: error.message
      })
    }
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const body = request.body()
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      if(!res.ok){
        return response.status(res.status).send({
          message: "Error al crear el registro.",
          status: res.status
        })
      }
      const data = await res.json()
      return response.status(201).json(data)
    } catch (error) {
      return response.status(500).send({
        message: 'Ocurrió un error inesperado al crear el registro',
        error: error.message,
      })
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const recordUrl = `${apiUrl}/${params.id}`
      const res = await fetch(recordUrl)
      if (!res.ok) {
        return response.status(res.status).send({
          message: `Error al obtener el registro con ID ${params.id}`,
          status: res.status,
        })
      }
      const data = await res.json()
      return response.json(data)
    } catch (error) {
      return response.status(500).send({
        message: 'Ocurrió un error inesperado',
        error: error.message,
      })
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const recordUrl = `${apiUrl}/${params.id}`
      const body = request.body()
      const res = await fetch(recordUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        return response.status(res.status).send({
          message: `Error al actualizar el registro con ID ${params.id}`,
          status: res.status,
        })
      }
      const data = await res.json()
      return response.json(data)
    } catch (error) {
      return response.status(500).send({
        message: 'Ocurrió un error inesperado al actualizar el registro',
        error: error.message,
      })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const recordUrl = `${apiUrl}/${params.id}`
      const res = await fetch(recordUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) {
        return response.status(res.status).send({
          message: `Error al eliminar el registro con ID ${params.id}`,
          status: res.status,
        })
      }
      return response.status(200).send({
        message: `Registro con ID: ${params.id} eliminado correctamente.`
      })
    } catch (error) {
      return response.status(500).send({
        message: 'Ocurrió un error inesperado al eliminar el registro',
        error: error.message,
      })
    }
  }
}
