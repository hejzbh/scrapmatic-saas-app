export const capitalize = (str: string) =>
  str[0].toUpperCase() + str.slice(1).toLowerCase();

export const objectToQs = (obj: { [key: string]: string }) => {
  let qs = "";

  for (const [key, value] of Object.entries(obj)) {
    qs += `${key}=${value}&`;
  }

  return qs;
};
