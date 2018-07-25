import moment from 'moment'


export function formattedDate(date, format = 'MM/DD/YY') {
    return moment(date).format(format)
  }

