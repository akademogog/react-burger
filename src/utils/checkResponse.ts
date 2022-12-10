export const checkResponse = (res: any): any => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
