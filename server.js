const express = require("express");

const app = express();
const userRouter = require("./routes/user");

app.use((req, res, next) => {
    if (["POST", "PATCH", "PUT"].includes(req.method) &&
    !req.is("application/json"))
    {
        res.sendStatus(400);
    } else {
        next();
    }
});

app.use(express.json());

app.use('/users', userRouter);

app.listen(3000);