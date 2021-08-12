const axios = require('axios')
class Send {
  sendArticle(url, data) {
    data.key = ''
    data.name = ''


    return axios({
      method: 'post',
      url: url,
      data: data,
      headers: { 'content-type': 'application/json' }
    })
  }
}

module.exports.sendArticle = new Send()
