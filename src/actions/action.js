import querystring from 'querystring';
import config from '../config';

export default async function action(type, host, path, params = {}, transform) {
  const url = `${host}/${path}?${typeof params === 'string' ? params.substring(1) : querystring.stringify(params)}`;

  const getDataStart = () => ({
    type: `REQUEST/${type}`,
  });
  const getDataOk = (payload) => ({
    type: `OK/${type}`,
    payload,
  });
  const getError = (error) => ({
    type: `ERROR/${type}`,
    error,
  });

  const fetchDataWithRetry = async (delay) => {
    try {
      const response = await fetch(url, url.startsWith(config.VITE_API_HOST) ? { credentials: 'include' } : {});
      if (!response.ok) {
        const err = new Error();
        err.fetchError = true;
        if (response.status >= 400 && response.status < 500) {
          err.clientError = true;
          err.message = 'fetch failed - client error';
        } else {
          err.message = 'fetch failed - retrying';
        }
        throw err;
      }
      const json = await response.json();
      return transform ? transform(json) : json;
    } catch (e) {
      console.error(e);
      if (e.fetchError && !e.clientError) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchDataWithRetry(delay + 3000);
      }
      throw e;
    }
  };

  try {
    const data = await fetchDataWithRetry(1000);
    return getDataOk(data);
  } catch (error) {
    return getError(error);
  }
}
