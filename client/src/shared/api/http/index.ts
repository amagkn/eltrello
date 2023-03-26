export interface ErrorData {
  errors: string[];
}

export const httpGet = async <Response, Err = ErrorData>(
  url: string,
  options: Omit<RequestInit, 'method'> = {}
): Promise<Response | Err | null> => {
  const fetchOptions = { ...options, method: 'GET' };

  const response = await fetch(url, fetchOptions);

  let responseBody;

  try {
    responseBody = await response.json();
  } catch (err) {
    responseBody = null;
  }

  if (response.ok) {
    return responseBody;
  } else {
    return Promise.reject(responseBody);
  }
};

export const httpPost = async <Response, Err = ErrorData>(
  url: string,
  options: Omit<RequestInit, 'method'> = {}
): Promise<Response | Err | null> => {
  const fetchOptions = { ...options, method: 'POST' };

  const response = await fetch(url, fetchOptions);

  let responseBody;

  try {
    responseBody = await response.json();
  } catch (err) {
    responseBody = null;
  }

  if (response.ok) {
    return responseBody;
  } else {
    return Promise.reject(responseBody);
  }
};
