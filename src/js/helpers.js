import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const AJAX = async function (result) {
  try {
    const rawdata = await result.json();

    if (!result.ok) {
      throw new Error(`${rawdata.message} ${result.status}`);
    }
    return rawdata;
  } catch (error) {
    throw error;
  }
};
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    return AJAX(res);
  } catch (error) {
    throw error;
  }
};

export const sendJSON = async function (url, dataToBeUploaded) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToBeUploaded),
    });

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    return AJAX(res);
  } catch (error) {
    throw error;
  }
};
