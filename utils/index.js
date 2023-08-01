import moment from 'moment'

export function getFormattedDate(date, format = 'DD-MM-YYYY') {
    if(!date) {
        return
    }
    return moment(date).locale('en').format(format)
}