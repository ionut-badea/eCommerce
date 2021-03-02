export default async function ({ $axios, $config }) {
  await $axios.onRequest((config) => {
    config.headers['Content-Type'] = 'application/json'
    config.headers.apiKey = $config.mongodb_api
  })
}
