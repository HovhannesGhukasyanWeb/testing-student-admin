

export default (permissions) => {
    let newPermissions = permissions.filter(permission => permission.type == "menu")
    let subPermissions = permissions.filter(permission => permission.type == "sub_menu")
    // console.log(Object.groupBy(newPermissions, ({ title }) => title))
    // console.log("subpermissions => ", Object.groupBy(subPermissions, ({ title }) => title))

    newPermissions.forEach(parentPermission => {
        const page = parentPermission.page;

        if (page == "/") {
            return;
        }

        subPermissions.forEach((subPermission) => {
            if (subPermission.page.startsWith(page)) {
                if (!parentPermission?.children) {
                    parentPermission.children = [];
                }

                parentPermission.children.push(subPermission)
            }
        })

        parentPermission.children = Object.groupBy(parentPermission.children, ({ title }) => title)
    });



    return newPermissions.map((newPermission) => {
        return {
            label: newPermission.title,
            value: newPermission.title + "-" + newPermission.page,
            children: mapGrouppedChildren(newPermission?.children)
        }
    })
}

const mapGrouppedChildren = (children = []) => {
    const newChildren = [];
    Object.keys(children).map((childrenKey) => {
        const childItem = children[childrenKey];
        const page = childItem[0].page;
        const newChildItem = {
            label: childrenKey,
            value: childrenKey + "-" + page,
            children: []
        }

        childItem.forEach(child => {
            newChildItem.children.push({
                label: child.method,
                value: child.id,
            })
        })

        newChildren.push(newChildItem);
    })

    return newChildren;
}