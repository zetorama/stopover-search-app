
export const API_URL = '/api/v1'

export const GET = 'GET'
export const POST = 'POST'
export const PUT = 'PUT'
export const DELETE = 'DELETE'

export async function fetch(method, path, data = undefined) {
  const url = `${API_URL}/${path}`
  const response = await window.fetch(url, {
    method,
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    },
    body: data == null ? undefined : JSON.stringify(data),
  })

  try {
    const data = await response.json()

    if (!response.ok) {
      const name = 'BadResponse'
      throw Object.assign(new Error(`Bad response from "${url}"`), { data, name })
    }

    return [data, response]

  } catch (err) {
    console.error(`FAILED api.fetch("${url}")\n`, err)
    const errors = err.data && err.data.errors
      || [{ title: response && response.statusText || 'Some weird error' }]

    throw Object.assign(err, { response, errors })
  }
}

export default fetch
