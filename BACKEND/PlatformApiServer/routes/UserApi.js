const validate = require('express-validation');

const authCtrl = require('../controllers/AuthCtrl');
const friendCtrl = require('../controllers/FriendCtrl');

module.exports = (router) => {
  /* Friend */
  router.route('/users/friends')
    .get(authCtrl.auth, friendCtrl.list('all'))
    .post(authCtrl.auth, friendCtrl.send);

  router.route('/users/friends/send')
    .get(authCtrl.auth, friendCtrl.list('send'));

  router.route('/users/friends/receive')
    .get(authCtrl.auth, friendCtrl.list('receive'));

  router.route('/users/friends/accept')
    .post(authCtrl.auth, friendCtrl.accept);

  router.route('/users/friends/reject')
    .post(authCtrl.auth, friendCtrl.reject);

  return router;
};