import Ax from './Ax';

export default {
  getById(id) {
    return Ax.get('/profile/' + id);
  }
}