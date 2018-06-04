export const success = [200, 201, 202, 304];
export const error = [500, 502];
export const statusToString = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  304: 'Not Modified',
  401: 'Unauthorized',
  404: 'Not Found',
  500: 'Internal Server Error',
  502: 'Bad Gateway'
};

export default {
  success,
  error,
  statusToString
};
