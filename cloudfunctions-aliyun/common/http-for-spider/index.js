const request = require('request')

const http = (uri) => {
  return new Promise((resolve, reject) => {
    request(
      {
        uri: uri,
        method: 'GET'
      },
      (err, response, body) => {
        if (err) {
          reject(err)
        } else {
          resolve(body)
        }
      }
    )
  })
}

module.exports = http
// export default http
