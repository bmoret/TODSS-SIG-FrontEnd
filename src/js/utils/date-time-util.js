export function dateToTimestamp(i) {
  let date = new Date(i)
  let timestamp = "";
  timestamp+= date.getUTCFullYear();
  timestamp+= "-";
  timestamp+= formatSingleDigitPart(date.getUTCMonth());
  timestamp+= "-";
  timestamp+= formatSingleDigitPart(date.getUTCDate());
  timestamp+= "T";
  timestamp+= formatSingleDigitPart(date.getUTCHours());
  timestamp+= ":";
  timestamp+= formatSingleDigitPart(date.getUTCMinutes());
  timestamp+= ":";
  timestamp+= formatSingleDigitPart(date.getUTCSeconds());
  return timestamp;
}

export function timestampToDateString(timestamp) {
  let date = new Date(timestamp)
  return `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}  ${dateToTimeSeparatedByColumn(date.getTime())}`
}

export function dateToTimeSeparatedByColumn(duration) {
  let date = new Date(duration);
  return date.toLocaleTimeString()
    .substr(0, 5);
}

export function datesToDuration(start, end) {
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();
  const differenceInMs = endDate - startDate;
  return differenceInMs > 0 ? differenceInMs : 0;
}

function formatSingleDigitPart(part) {
  return part < 10?  0 + part.toString() : part.toString();
}

export function timeSeparatedByColonToMilliseconds(time) {
  let duration = time.split(':');
  let hours = duration[0] * 60 * 60
  let seconds = duration[1] * 60
  return (hours + seconds) * 1000;
}