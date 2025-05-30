import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import session from "express-session";
import "dotenv/config";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import { AssignmentRoutes } from "./Kambaz/Assignments/routes.js";
import mongoose from "mongoose";
import QuestionRoutes from "./Kambaz/Questions/routes.js";
import QuizRoutes from "./Kambaz/Quizzes/routes.js";
import QuestionAnswerRoutes from "./Kambaz/QuestionAnswer/routes.js";

const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      console.log(origin);
      callback(
        null,
        origin === (process.env.NETLIFY_URL || "http://localhost:5173")
      );
    },
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));
app.use(express.json());

Hello(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
EnrollmentRoutes(app);
AssignmentRoutes(app);
QuestionRoutes(app);
QuizRoutes(app);
QuestionAnswerRoutes(app);
app.listen(process.env.PORT || 4000);
