import { Action } from "routing-controllers";

class Auth {
  public static async authChecker(action: Action): Promise<boolean> {
    const authTokenHeaders = action.request.headers["authorization"];
    const authTokenExpected = process.env["API_ACCESS_TOKEN"];
    if (authTokenHeaders === `Bearer ${authTokenExpected}`) {
      return true;
    }
    return false;
  }
}

export { Auth };
