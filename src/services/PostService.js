import axios from 'axios';

const remote = axios.create({
  baseURL: 'http://localhost:8000/api'
});

export default {
  getAll() {
    return remote.get('/posts')
      .then(res=> {
        return res.data;
      })
      .catch(err=> {

      })
  }
}