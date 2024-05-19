import { app } from "./src/app";

const port = process.env.PORT || 80

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})