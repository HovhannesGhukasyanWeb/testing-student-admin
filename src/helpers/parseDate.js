export default (date) => {
    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0] + ' ' + dateObj.toTimeString().split(' ')[0];
}