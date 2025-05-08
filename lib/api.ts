export const api = {
    get: async (url: string, token?: string) => {
      const headers: HeadersInit = {}
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
  
      const response = await fetch(`${process.env.API_URL}${url}`, {
        headers,
      })
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
  
      return response.json()
    },
  
    post: async (url: string, data: any, token?: string) => {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      }
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
  
      const response = await fetch(`${process.env.API_URL}${url}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      })
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
  
      return response.json()
    },
  }
  