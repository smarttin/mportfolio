const jwt = require('jsonwebtoken');

export default (context) => {
  let token;
  if (context.req && context.req.headers.authorization) {
    token = context.req.headers.authorization.split('Bearer ')[1];
  }
  // console.log(process.env.JWT_SECRET);
  if (token) {
    jwt.verify(token, 'process.env.JWT_SECRET', (err, decodedToken) => {
      context.user = decodedToken;
    });
  }
  console.log(token);
  return context;
};
