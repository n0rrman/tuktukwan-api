import { app } from "./src/app";

const port = process.env.PORT || 2567 

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${port}`);
})