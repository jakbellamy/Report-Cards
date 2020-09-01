import _ from 'lodash';
import jwt from 'jsonwebtoken';
import mock from 'src/utilities/utils/mock';
const users = require('./users')
const JWT_SECRET = 'devias-top-secret-key';
const JWT_EXPIRES_IN = '2 days';


const db = {
  users: users
};

mock.onPost('/api/account/login').reply((config) => {
  const { email, password } = JSON.parse(config.data);

  let user = db.users.find(user => {
    return user.email.toLowerCase() === email.toLowerCase() && user.password === password
  })

  if(user){
    const accessToken = jwt.sign(
      { id: user.id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    return [200, { user, accessToken }];
  } else {
      return [400, { message: 'Please check your email and password' }];
    }
  // if (email === 'jakbellamy@gmail.com' && password === 'admin' ||
  //   email.toLowerCase() === 'zachary.lavoy@supremelending.com' && password === 'adminlavoy' ||
  //   email === 'jmvolpe@nc.rr.com' && password === 'adminvolpe') {
  //   const { user } = db;
  //   const accessToken = jwt.sign(
  //     { id: user.id },
  //     JWT_SECRET,
  //     { expiresIn: JWT_EXPIRES_IN }
  //   );
  //   return [200, { user, accessToken }];
  // } else {
  //   return [400, { message: 'Please check your email and password' }];
  // }

});

mock.onGet('/api/account/me').reply((config) => {
  const { Authorization } = config.headers;

  if (!Authorization) {
    return [401, { message: 'Authorization token missing' }];
  }

  try {
    const accessToken = Authorization.split(' ')[1];

    const { id } = jwt.verify(accessToken, JWT_SECRET);

    let user = db.users.find(user => {
      return user.id === id
    })

    if (!user) {
      return [401, { message: 'Invalid authorization token' }];
    }

    return [200, { user: user }];
  } catch (error) {
    return [401, { message: 'Invalid authorization token' }];
  }
});

mock.onPost('/api/account/profile').reply((request) => {
  const { update } = JSON.parse(request.data);

  _.assign(db.user, update);

  return [200, { user: db.user }];
});

mock.onGet('/api/account/settings').reply(200, {
  settings: {}
});

mock.onGet('/api/account/subscription').reply(200, {
  subscription: {
    name: 'Freelancer',
    price: '5',
    currency: '$',
    proposalsLeft: 12,
    templatesLeft: 5,
    invitesLeft: 24,
    adsLeft: 10,
    hasAnalytics: true,
    hasEmailAlerts: true
  }
});
