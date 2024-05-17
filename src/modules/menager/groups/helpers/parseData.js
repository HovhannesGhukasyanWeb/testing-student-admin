export const transformArrayForTeacherSelect = (array) => {
    return array.map(item => ({
        value: item.id,
        label: item.username
    }));
};

export const transformArrayForGroupTypeSelect = (array) => {
    return array.map(item => ({
        value: item.id,
        label: item.name
    }));
};
