// Utilitário centralizado de HTTP — padrão definido nas copilot-instructions

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function createApiErrorFromResponse(response: Response): Promise<ApiError> {
  let message = `Erro ${response.status}`
  try {
    const body = await response.json()
    // Suporta ProblemDetail (RFC 9457) retornado pelo Spring Boot
    if (body?.detail) message = body.detail
    else if (body?.message) message = body.message
  } catch {
    // corpo não é JSON — mantém mensagem padrão
  }
  return new ApiError(response.status, message)
}

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error
  if (error instanceof Error) return new ApiError(0, error.message)
  return new ApiError(0, 'Erro desconhecido')
}

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request<T>(method: string, url: string, body?: unknown): Promise<T> {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    throw await createApiErrorFromResponse(response)
  }

  // 204 No Content — sem corpo
  if (response.status === 204) return undefined as T

  return response.json() as Promise<T>
}

export const api = {
  get: <T>(url: string) => request<T>('GET', url),
  post: <T>(url: string, body: unknown) => request<T>('POST', url, body),
  put: <T>(url: string, body: unknown) => request<T>('PUT', url, body),
  delete: (url: string) => request<void>('DELETE', url),
}
