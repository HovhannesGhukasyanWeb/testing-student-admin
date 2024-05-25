export const hasPagePermission = (route, permissions) => {

    let permissionString = '';

    permissions.forEach(permission => permissionString += permission.page);

    if(!permissionString.includes(route) && location.pathname !== '/not-found') location.assign('/not-found');
} 