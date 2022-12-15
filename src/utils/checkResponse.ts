export const checkResponse = (res: Response): any => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
