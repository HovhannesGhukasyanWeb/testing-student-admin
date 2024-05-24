import sidebar from "../constants/sidebar";
import { logout } from "../store/slices/userSlice";

export const sidebarPages = (permissions) => (dispatch) => {

    if (!permissions) dispatch(logout());

    let permissionString = '';

    permissions.forEach(permission => permissionString += permission.page);

    let userSidebas = sidebar.filter(item => permissionString.includes(item.path));

    userSidebas.forEach((userSideba, index) => {
        userSidebas[index].items.filter(item => permissionString.includes(item.path));
    })

    return userSidebas;
}