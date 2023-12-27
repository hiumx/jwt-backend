import homeRouter from './home';

const webRoutes = (app) => {
    app.use('/', homeRouter);
}

export default webRoutes;



