export const capitalize = (str: string) =>
  str[0].toUpperCase() + str.slice(1).toLowerCase();

export const objectToQs = (obj: { [key: string]: string }) => {
  let qs = "";

  for (const [key, value] of Object.entries(obj)) {
    qs += `${key}=${value}&`;
  }

  return qs;
};

export const truncString = (str: string, max: number) =>
  str.length > max ? str.slice(0, max) + "..." : str;

export const timeAgo = (date: Date) => {
  const now = new Date().getTime();
  const inputDate = new Date(date).getTime();

  const seconds = Math.floor((now - inputDate) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `Just now`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  return `${years} year${years > 1 ? "s" : ""} ago`;
};
