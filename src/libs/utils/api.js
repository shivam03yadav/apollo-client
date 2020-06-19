import axios from 'axios';

async function callApi(method, url, data, option = {}) {
  try {
    const getUrl = process.env.REACT_APP_BASE_URL + url;
    const response = await axios({
      method,
      url: getUrl,
      ...data,
      ...option,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export default callApi;
