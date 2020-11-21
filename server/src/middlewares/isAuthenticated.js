export const isAuthenticated = (request) => {
  if (!request.userId) {
    throw Error('You need to log in to perform this action');
  }
  return;
};
