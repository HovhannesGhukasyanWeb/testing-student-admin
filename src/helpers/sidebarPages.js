import sidebar from "../constants/sidebar";
import { logout } from "../store/slices/userSlice";

export const sidebarPages = (permissions) => (dispatch) => {

    if (!permissions) dispatch(logout());

    let permissionString = '';

    permissions.forEach(permission => permissionString += permission.page);

    let userSidebars = sidebar.filter(item => permissionString.includes(item.path));
    

    userSidebars.forEach((userSidebar, index) => {
        userSidebars[index].items = userSidebar.items.filter(item => permissionString.includes(item.path));
    })

    return userSidebars;
}