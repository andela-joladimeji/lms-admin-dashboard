import axios from 'axios';
export default {
  get:() => {
    return axios.get(process.env.API_URL)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log('error in service', error)
        return error;
      });
  }
};
