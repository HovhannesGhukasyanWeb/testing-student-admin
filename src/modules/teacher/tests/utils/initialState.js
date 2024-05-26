export default (test) => {
    if (test) {
        return {
            name: test.name,
            subject_id: test.subject_id,
            test_type_id: test.test_type_id,
        }
    }

    return {
        name: '',
        subject_id: null,
        test_type_id: null,
    }
}