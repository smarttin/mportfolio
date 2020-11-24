import moment from 'moment';

export const formatDate = (date) =>
  moment.unix(date / 1000).format('DD/MM/YYYY');

export const formatDetailDate = (date, dateFormat = 'LL') =>
  date && moment.unix(date / 1000).format(dateFormat);

export const fromNow = (date) => moment.unix(date / 1000).fromNow();

export const shortify = (text, maxLength = 50) => {
  if (!text) {
    return '';
  }
  if (text.length <= maxLength) {
    return text;
  }

  return text.substr(0, maxLength) + '...';
};
