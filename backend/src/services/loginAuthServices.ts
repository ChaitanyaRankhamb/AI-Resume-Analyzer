import { User } from "../entities/User";
import { UserRepositoryMongo } from "../repositories/mongo/User";

interface loginServiceDataProps {
  user: Partial<User>;
  token: string;
}

interface sessionProps {
  user: User;
  token: string;
  expiresAt: Date;
}

interface loginServicePromise {
  user: User;
  session: sessionProps; // Add session data
  token: string;
}

// Session expiry - 7 days in milliseconds
const SESSION_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

export class UserLoginServices {
  constructor(private userRepositories: UserRepositoryMongo) {}

  // user sign up service logic
  async login(data: loginServiceDataProps): Promise<loginServicePromise> {
    const { user, token } = data;
  
    if (!user || typeof user._id === "undefined") {
      throw new Error("Invalid user data: missing required user properties");
    }
  
    const completeUser = user as User;
    const now = Date.now();
    const sessionPropsObj: sessionProps = {
      user: completeUser,
      token,
      expiresAt: new Date(now + SESSION_EXPIRY_MS),
    };
  
    return {
      user: completeUser,
      session: sessionPropsObj,
      token,
    };
  }
}  