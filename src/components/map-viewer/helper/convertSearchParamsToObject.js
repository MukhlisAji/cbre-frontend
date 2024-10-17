export const convertSearchParamsToObject = (searchParams) => {
  const params = new URLSearchParams(searchParams);
  const obj = {};
  for (const [key, value] of params) {
    obj[key] = value;
  }
  return obj;
};
