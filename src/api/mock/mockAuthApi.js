class AuthApi {
  static authenticateUser(delay = 1000) {
    return Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, delay);
      reject('error happened');
    });
  }
}

export default AuthApi;