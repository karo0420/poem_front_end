import Ax from './Ax';

export default {
  getAll() {
    return Ax.get('/posts')
      .then(res=> {
        return res;
      }).catch(err=> { console.log('Get all error')});
  },
  getById(id) {
    return Ax.get('/posts/' + id)
      .then(res=> {
        return res;
      }).catch(err=> { console.log('Get by id error')});
  },
  getByUserId(id) {
    return Ax.get('/posts/user/' + id);
  },
  getComments(postId, page = 1) {
    return Ax.get('/comments/' + postId + '?page=' + page)
      .then(res=> {
        return res;
      }).catch(err=> { console.log('Get comments error')});
  },
  getVoices(postId, page = 1) {
    return Ax.get('/voices/' + postId + '?page=' + page)
      .then(res=> {
        return res;
      }).catch(err=> { console.log('Get voices error')});
  }
}