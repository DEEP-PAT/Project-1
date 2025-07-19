import conf from '../conf/conf.js';
import { Client, Account,Id } from 'appwrite';


export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(Id.unique(),email,password,name);
            if (userAccount) {
                return this.login({email, password});
                //call another method
            } else {
                return userAccount;
            }
            
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {

            return await this.account.createEmailSession(email, password);
            
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }

        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSession('current');
        } catch (error) {
            throw error;
        }
    }
}


const authService = new AuthService();

export default authService;