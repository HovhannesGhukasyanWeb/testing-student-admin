export const userFullName = (user) => {
    return !user?.user_profile ? user.username : user.user_profile.first_name + ' ' + user.user_profile.last_name + ' ' + user.user_profile.middle_name; 
} 