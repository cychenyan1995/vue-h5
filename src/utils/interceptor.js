import axios from 'axios'

const transformData = (data) => {
    const arr = []
    if (!data) {
        return ''
    }
    Object.keys(data).forEach(k => {
        arr.push(`${k}=${data[k]}`)
    })
    return arr.join('&')
}

axios.defaults.timeout = 1000 * 15
    // axios.defaults.withCredentials = true
    // axios.defaults.crossDomain=true
    // axios.defaults.transformRequest = [function (data) {
    //   data = Qs.stringify(data)
    //   return data
    // }]
axios.interceptors.request.use(config => {
    config.headers.token = ''
        // const data = transformData(config.data)
        // if (config.method === 'post') {
        //   if(config.data.type !== 'requestBody'){
        //     config.url = `${config.url}?${data}`
        //   }
        // }
        // console.log(config)
    return config
}, error => {
    return Promise.reject(error)
})
axios.interceptors.response.use(res => {
    if (res) {}
    return res
}, error => {
    return Promise.reject(error)
})

export default axios