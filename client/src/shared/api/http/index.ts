const httpGet = async <R>(url: string): Promise<R | null> => {
  const response = await fetch(url, { method: 'GET' });

  if (response.ok) {
    try {
      return response.json();
    } catch (err) {}
  }

  return null;
};
const httpPost = () => null;

export { httpGet, httpPost };
