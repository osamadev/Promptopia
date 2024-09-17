import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import connectToDatabase from "@/utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({session}) {
            const sessionUser = await User.findOne({
                email: session.user.email,
            });
            session.user.id = sessionUser._id;
            return session;
        },
        async signIn({profile}) {
            try {
            const {email, name, picture} = profile;
            await connectToDatabase();
            const user = await User.findOne({
                email,
            });
            if (!user) {
                await User.create({
                    email,
                    username: name.replace(" ", "").toLowerCase(),
                    image: picture,
                });
            }
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
},
});

export {handler as GET, handler as POST};