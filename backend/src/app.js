import express from 'express';
import authRoutes from "./routes/auth.routes.js";
import cookieParser from 'cookie-parser';
import postRoutes from "./routes/post.routes.js";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/posts',postRoutes);

export default app;

