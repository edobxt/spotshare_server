export function listAllRoutes(app) {
    let routesList = [];

    function readStack(stack, basePath = '') {
        stack.forEach((stackItem) => {
            if (stackItem.route) {
                const { path, methods } = stackItem.route;
                let methodsList = Object.keys(methods).map(method => method.toUpperCase()).join(', ');
                routesList.push({ path: basePath + path, methods: methodsList });
            } else if (stackItem.name === 'router' && stackItem.handle.stack) {
                let newPath = basePath + (stackItem.regexp.source.replace('^\\', '').replace('\\/?$', '').replace('(?:', '').replace(')?', '') || '');
                readStack(stackItem.handle.stack, newPath);
            }
        });
    }

    readStack(app._router.stack);

    return routesList;
}

export function generateRoutesHtml(app) {
    let routesHtml = '<!DOCTYPE html><html><head><title>Liste des routes API spotshare</title></head><body>';
    routesHtml += '<h1>Bienvenue sur l\'API de Spotshare</h1><h3>Liste des Routes</h3><ul>';

    const routesList = listAllRoutes(app);

    routesList.forEach(route => {
        const cleanedPath = cleanPath(route.path);
        routesHtml += `<li>Path: ${cleanedPath} - Methods: [${route.methods}]</li>`;
    });

    routesHtml += '</ul></body></html>';

    return routesHtml;
}

function cleanPath(path) {
    return path.replace(/\/?\?\(=\?\\\/\|\$\)/g, '').replace(/\\\/\?\(\?=\\\/\|\$\)/g, '/');
}


