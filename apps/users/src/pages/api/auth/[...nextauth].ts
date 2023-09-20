import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { saveUserData } from "../saveUserData";
import { checkCreds } from "../checkCreds";

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.NEXT_GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET || ''
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        
        console.log(JSON.stringify('Inside authorize, credentials - '), credentials);
        
        if(!credentials){
          return Promise.resolve(null);
        }

        const user = await checkCreds(credentials.email, credentials.password);

        console.log('Inside authorize, user - ', user);

        if (user) {
          return Promise.resolve(user);
        }

        return Promise.resolve(null);
      }
    })
    // ...add more providers here
  ],
  callbacks: {
    async signIn(data: any){
      console.log('user - ',JSON.stringify(data.user));
      console.log('account - ',JSON.stringify(data.account));
      console.log('profile - ',JSON.stringify(data.profile));

      if(data.account.provider=='google'){
        return saveUserData(data.user.email, data.user.name);
      }
      
      return true;
    }
  },
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30*24*60*60
  },
  jwt: {
    encryption: true
  }
}
export default NextAuth(authOptions)