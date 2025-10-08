import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes";
import {
  clerkMiddleware,
  clerkClient,
  requireAuth,
  getAuth,
} from "@clerk/express";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Configure CORS to allow credentials
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
  })
);
app.use(express.json());

// ✅ Clerk middleware must come BEFORE routes that use `requireAuth()`
// Only use Clerk middleware if environment variables are set
if (process.env.CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY) {
  app.use(
    clerkMiddleware({
      // Allow requests from frontend
      publishableKey: process.env.CLERK_PUBLISHABLE_KEY as string,
    })
  );
} else {
  console.log(
    "⚠️  Clerk environment variables not set - authentication disabled"
  );
}

// ✅ Example protected route (only available when Clerk is configured)
if (process.env.CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY) {
  app.get("/protected", requireAuth(), async (req, res) => {
    try {
      const { userId } = getAuth(req);
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }
      const typedUserId: string = userId as string;
      const user = await clerkClient.users.getUser(typedUserId);

      res.json({ message: "Protected route accessed successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
} else {
  // Fallback route when Clerk is not configured
  app.get("/protected", (req, res) => {
    res.json({
      message: "Protected route - Clerk not configured",
      note: "Set CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY to enable authentication",
    });
  });
}

// ✅ Mount your normal API routes
app.use("/api", uploadRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
