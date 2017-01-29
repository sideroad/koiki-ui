import moment from 'moment';

export default function ({ dates = [], format = 'D MMM', delimiter = ', ', range = ' - ' }) {
  const normalizes = [];
  dates.forEach((date) => {
    const normalize = normalizes[normalizes.length - 1] || [];
    const before = normalize[normalize.length - 1];
    // is consecutive with previouse date.
    if (before &&
        moment.utc(date, 'YYYY-MM-DD').diff(before, 'days') === 1
    ) {
      normalize.push(moment.utc(date, 'YYYY-MM-DD'));
    } else {
      normalizes.push([moment.utc(date, 'YYYY-MM-DD')]);
    }
  });

  return normalizes.map((normalize) => {
    if (normalize.length > 1) {
      return `${normalize[0].format(format)}${range}${normalize[normalize.length - 1].format(format)}`;
    }
    return normalize[0].format(format);
  }).join(delimiter);
}
