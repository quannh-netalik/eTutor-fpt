const defaultSettings = {
  API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT,
  GRAPHQL_API_ENDPOINT: process.env.REACT_APP_GRAPHQL_API_ENDPOINT
}

const regex_config = {
  RegexEmail: /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  RegexDisplayName: /^[a-z0-9_-]{3,16}$/
}

export { defaultSettings, regex_config }
