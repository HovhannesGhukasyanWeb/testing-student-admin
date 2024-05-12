export const changeDateFormat = (date) => {
    let changedDate = '';
    const newDate = new Date(date);
    changedDate = newDate.toLocaleDateString() + ' ' + newDate.toLocaleTimeString();

    return changedDate;
}