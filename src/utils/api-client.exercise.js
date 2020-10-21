async function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  }
  const response = await window.fetch(
    `${process.env.REACT_APP_API_URL}/${endpoint}`,
    config,
  )
  const data = await response.json()

  if (response.ok) {
    return data
  } else {
    throw data
  }
}

export { client }
