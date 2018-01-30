const validate = require('express-validation');

const authCtrl = require('../controllers/AuthCtrl');
const friendCtrl = require('../controllers/FriendCtrl');

module.exports = (router) => {
  /* Friend */
  router.route('/users/friends')
    .get(authCtrl.auth, friendCtrl.list)
    .post(authCtrl.auth, friendCtrl.send);

  router.route('/users/friends/accept/:idx')
    .get(authCtrl.auth, friendCtrl.accept);

  router.route('/users/friends/reject/:idx')
    .get(authCtrl.auth, friendCtrl.reject);

  return router;
};