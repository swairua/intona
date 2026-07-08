const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8082/intona/api'

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}/${endpoint}`
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  const json: ApiResponse<T> = await res.json()
  if (!json.success) throw new Error(json.error || 'API request failed')
  return json.data as T
}

export async function get<T>(endpoint: string): Promise<T> {
  return request<T>(endpoint)
}

export async function post<T>(endpoint: string, body: unknown): Promise<T> {
  return request<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function uploadFile<T>(endpoint: string, formData: FormData): Promise<T> {
  const url = `${BASE_URL}/${endpoint}`
  const res = await fetch(url, { method: 'POST', body: formData })
  const json: ApiResponse<T> = await res.json()
  if (!json.success) throw new Error(json.error || 'Upload failed')
  return json.data as T
}
