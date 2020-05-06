import axios from 'axios';

const remote = axios.create({
  //baseURL: 'http://localhost:8000/api',
  //baseURL: 'http://192.168.0.4/poem/public/api',
  //baseURL: 'http://localhost:3000',
  baseURL: 'http://api.soleimanian.com/api',
  //timeout: 2000
});

var requests = [];

export default {
  get(url) {
    return new Promise((resolve, reject)=> {
      const index = requests.findIndex(e=> e.url == url);
      if (index >= 0) {
        //reject({  message: 'Duplicate request sent'})
      }else {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        requests.push({
          url: url,
          source: source
        });
        remote.get(url, {cancelToken: source.token})
          .then(res=> {
            requests.splice(index, 1);
            resolve(res);
          })
          .catch(err=> {
            if (axios.isCancel(err))
              console.log('canceled');
            requests.splice(index, 1);
            reject(err);
          })
        //this.cancel(url);
      }
    });
  },
  cancel(urls) {
    urls.forEach(url=> {
      const req = requests.find(e=> e.url == url);
      if (req)
        req.source.cancel();
    });
  },
  getRequests() {
    return requests;
  }
} 