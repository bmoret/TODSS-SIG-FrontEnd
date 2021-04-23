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

function formatSingleDigitPart(part) {
  return part < 10?  0 + part.toString() : part.toString();
}