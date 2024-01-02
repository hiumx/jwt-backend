import routerApiV1 from './apiV1';

const apiRoutes = (app) => {
    app.use('/api/v1', routerApiV1);
}

export default apiRoutes;