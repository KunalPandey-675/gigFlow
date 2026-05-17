import { app } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
const startServer = async () => {
    try {
        await connectDatabase();
        app.listen(env.PORT, () => {
            console.log(`GigFlow API running on port ${env.PORT}`);
        });
    }
    catch (error) {
        console.error("Server startup failed", error);
        process.exit(1);
    }
};
void startServer();
//# sourceMappingURL=index.js.map