import doctorRoutes from "./doctor.routes";
import express from "express"


const routes = (app: express.Application) => {

    app.use('/', doctorRoutes.routes);
}

export default routes