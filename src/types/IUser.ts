export interface IUser {
  id: number;
  email: string;
  password: string;
  name?: string;
  role?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
