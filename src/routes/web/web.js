import homeRouter from './home';
import userRouter from './user';

const webRoutes = (app) => {

    app.use('/users', userRouter);
    
    app.use('/', homeRouter);

}

export default webRoutes;



