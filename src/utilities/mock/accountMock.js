import _ from 'lodash';
import jwt from 'jsonwebtoken';
import mock from 'src/utilities/utils/mock';
const JWT_SECRET = 'devias-top-secret-key';
const JWT_EXPIRES_IN = '2 days';

const users = [
  {
    id: '1',
    role: 'admin',
    email: 'jakbellamy@gmail.com',
    password: 'admin',
    firstName: 'Jakob',
    lastName: 'Bellamy',
  },
  {
    id: '00178682h1',
    role: 'admin',
    email: 'jmvolpe@nc.rr.com',
    password: 'adminvolpe',
    firstName: 'Jeanne',
    lastName: 'Volpe',
  },
  {
    id: '00142682h1',
    role: 'admin',
    email: 'zachary.lavoy@supremelending.com',
    password: 'adminlavoy',
    firstName: 'Zachary',
    lastName: 'LaVoy',
  },
  {
    id: '0019y682h1',
    role: 'admin',
    email: 'TJ.Flood@supremelending.com',
    password: 'adminflood',
    firstName: 'TJ',
    lastName: 'Flood',
  },
  {
    id: 'bqcu4',
    role: 'smgr',
    email: 'Nick.Yeargin@supremelending.com',
    password: 'ny6smgr',
    firstName: 'Nick',
    lastName: 'Yeargin',
    accounts: [38, 5, 41, 6, 42, 7, 9, 11, 43, 13, 14, 15, 22, 17, 18, 19, 20, 21, 44, 25]
  },
  {
    id: 'b164bd',
    role: 'admin',
    email: 'John.Ragland.Jr@supremelending.com', // not his real email
    password: 'jr4smgr',
    firstName: 'John',
    lastName: 'Ragland',
    accounts: []
  },
  {
    id: 'tuxb35',
    role: 'admin',
    email: 'Brian.Messer@supremelending.com',
    password: 'bm8smgr',
    firstName: 'Brian',
    lastName: 'Messer',
    accounts: []
  },
  {
    id: 'vs7d',
    role: 'smgr',
    email: 'Richard.Lester@supremelending.com',
    password: 'rl9smgr',
    firstName: 'Richard',
    lastName: 'Lester',
    accounts: [12, 24, 25]
  },
  {
    id: 'inw8c',
    role: 'admin',
    email: 'Amir.Davari@supremelending.com', // Not his real Email
    password: 'ad12smgr',
    firstName: 'Amir',
    lastName: 'Davari',
    accounts: []
  },
  {
    id: 'qvnr61',
    role: 'admin',
    email: 'Scott.Mackie@supremelending.com',
    password: 'sm91smgr',
    firstName: 'Scott',
    lastName: 'Mackie',
    accounts: []
  },
  {
    id: '83hsyc7',
    role: 'smgr',
    email: 'Keith.Johnson@supremelending.com',
    password: 'kj76smgr',
    firstName: 'Keith',
    lastName: 'Johnson',
    accounts: [12, 25]
  },
  {
    id: '74hvs6',
    role: 'admin',
    email: 'Robert.Wills@supremelending.com',
    password: 'rw24smgr',
    firstName: 'Robert',
    lastName: 'Wills',
    accounts: []
  },
  {
    id: 'peb63m',
    role: 'admin',
    email: 'Tom.Flood@supremelending.com',
    password: 'tf16smgr',
    firstName: 'Tom',
    lastName: 'Flood',
    accounts: []
  },
  {
    id: 'y254nw',
    role: 'admin',
    email: 'Jeffrey.Sachs@supremelending.com',
    password: 'js81smgr',
    firstName: 'Jeffrey',
    lastName: 'Sachs',
    accounts: []
  },
  {
    id: 'nsdfuv72hvi',
    role: 'admin',
    email: 'Patrick.Flood@supremelending.com',
    password: 'adminpflood',
    firstName: 'Pat',
    lastName: 'Flood'
  },
  {
    id: 'bniw27unv',
    role: 'smgr',
    email: 'Lisa.Spencer@supremelending.com',
    password: 'ls88adm',
    firstName: 'Lisa',
    lastName: 'Spencer',
    accounts: [1, 40, 3, 4, 5, 8, 10, 23, 39, 26, 27, 28]
  },
  {
    id: 'vjsd3452f3',
    role: 'smgr',
    email: 'Cale.Iorg@supremelending.com',
    password: 'ci46smgr',
    firstName: 'Cale',
    lastName: 'Iorg',
    accounts: [20, 42, 25]
  },
]

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
