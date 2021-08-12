const { sendArticle } = require('./utils/request')
const { scrape } = require('./utils/crawl')

// 爬虫迁移数据
scrape('http://www.dgncyy.cn/articlecategory/list_2012').then(res => {
    res = res.map(item => {
        return {
            title: item.title,
            content: item.content,
            createdTime: dayjs(item.time).format('YYYY-MM-DD HH:mm:ss'),
            publishedTime: dayjs(item.time).format('YYYY-MM-DD HH:mm:ss'),
            isPublish: "true",
            websiteId: "",
            channelId: ""
        }
    })
    let count = 0
    // 爬下数据发送请求给接口
    for (let i = 0; i < res.length; i++) {
        sendArticle.sendArticle('/xxx', { params: res[i] }).then(result => {
            if (result.data.code == '0') {
                count += 1
                console.log(count + '-' + res.length)
            }
            if (count == res.length) {
                console.log('执行完毕')
            }
        })
    }
})