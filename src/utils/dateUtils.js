import {date} from "quasar";

export function checkIfAfterToday(date) {
  const today = new Date();
  const eventDate = new Date(date);

  return eventDate > today;
}

export function formatPostedDate(timeStamp) {
  const date1 = new Date();
  const date2 = new Date(timeStamp);

  const timeDiffInMilliseconds = date1 - date2;

  const minuteThreshold = 60 * 1000; // 1 minute in milliseconds
  const hourThreshold = 60 * minuteThreshold; // 1 hour in milliseconds
  const dayThreshold = 24 * hourThreshold; // 1 day in milliseconds

  let unit;
  if (timeDiffInMilliseconds < minuteThreshold) {
    unit = 'seconds';
  } else if (timeDiffInMilliseconds < hourThreshold) {
    unit = 'minutes';
  } else if (timeDiffInMilliseconds < dayThreshold) {
    unit = 'hours';
  } else {
    unit = 'days'
  }

  const diff = date.getDateDiff(date1, date2, unit);

  return diff === 1 ? diff + ' ' + unit.slice(0, -1) + ' ago' : diff + ' ' + unit + ' ago';
}

export function formatPostedDateComment(timeStamp) {
  const date1 = new Date();
  const date2 = new Date(timeStamp);

  const timeDiffInMilliseconds = date1 - date2;

  const minuteThreshold = 60 * 1000; // 1 minute in milliseconds
  const hourThreshold = 60 * minuteThreshold; // 1 hour in milliseconds
  const dayThreshold = 24 * hourThreshold; // 1 day in milliseconds

  let unit;
  if (timeDiffInMilliseconds < minuteThreshold) {
    unit = 'seconds';
  } else if (timeDiffInMilliseconds < hourThreshold) {
    unit = 'minutes';
  } else if (timeDiffInMilliseconds < dayThreshold) {
    unit = 'hours';
  } else {
    unit = 'days'
  }

  const diff = date.getDateDiff(date1, date2, unit);

  return `${diff} ${unit.slice(0, 1)}`
}

export function formatEventDayOfWeek(eventDate) {
  // Extract and format the day of the week
  return date.formatDate(new Date(eventDate), 'ddd');
}

export function formatEventDayOfMonth(eventDate) {
  // Extract and format the day of the month
  return date.formatDate(new Date(eventDate), 'Do');
}

export function formatEventMonth(eventDate) {
  // Extract and format the month
  return date.formatDate(new Date(eventDate), 'MMMM');
}
