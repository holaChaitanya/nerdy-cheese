/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';

export function resolveHtmlPath(htmlFileName: string, search: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    url.search = search;
    return url.href;
  }
  const res = `file://${path.resolve(
    __dirname,
    '../renderer/',
    htmlFileName,
  )}?${search}`;

  return res;
}

export function getReadableTime(durationInSeconds: number) {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;

  let result = '';

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  if (hours > 0) {
    result += `${formattedHours}h`;
  }

  if (minutes > 0) {
    result += `${formattedMinutes}m`;
  }

  if (seconds > 0) {
    result += `${formattedSeconds}s`;
  }

  return result;
}
