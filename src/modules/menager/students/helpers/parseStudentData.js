export const parseStudentEditData = (data) => {
    return {...data, 
        password: data.password ? data.password : undefined,
        user_profile: {...data.user_profile,
            age: data.user_profile.age ? data.user_profile.age : null,
            courses: data.user_profile.courses ? data.user_profile.courses : null,
        },
    }
}