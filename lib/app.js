import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import orderController from './controlers/orders.js';
const app = express();

app.use(express.json());

if (app) {
}
app.use('/api/v1/orders', orderController);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
