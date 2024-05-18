

export default (permissions) => {
    const permissionsTree = {
        title: 'Permissions',
        children: [],
    };

    permissions.forEach(({ title, name }) => {
        const [parent, child] = title.split('.');

        const parentIndex = permissionsTree.children.findIndex(({ title }) => title === parent);

        if (parentIndex === -1) {
            permissionsTree.children.push({
                title: parent,
                children: [
                    {
                        title: child,
                        name,
                    },
                ],
            });
        } else {
            permissionsTree.children[parentIndex].children.push({
                title: child,
                name,
            });
        }
    });

    return permissionsTree;
}