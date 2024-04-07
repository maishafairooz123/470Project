import authMid from './auth.mid.js';
const adminMid = (req, res, next) => {
  if (!req.user.admin) res.status(401).send();

  return next();
};

export default [authMid, adminMid];
