import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  Client = new Client();
  account;
  constructor() {
    this.Client.setEndpoint(conf.apprriteUrl).setProject(
      conf.apprriteProjectID
    );
    this.account = new Account(this.Client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call Another Method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: Error", error);
    }
    return null;
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}
const authservice = new AuthService();
export default authservice;
