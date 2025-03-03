import { eq, and } from "drizzle-orm";
import { users } from "../db/schema"; // Import schema
import { User } from "next-auth";
import { db } from "../db/drizzle";

// Function to get a user by email
export const getUserByEmail = async (email: string): Promise<User> => {
    const result = await db
        .select({
            id: users.id,
            firstName: users.firstName,
            lastName: users.lastName,
            email: users.email,
            password: users.password,
            role: users.role,
            createdAt: users.createdAt,
            isDeleted: users.isDeleted,
        })
        .from(users)
        .where(and(eq(users.email, email), eq(users.isDeleted, false)))
        .limit(1);
    const user = result[0];

    return {
        id: user.id.toString(), // Convert number ID to string
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        password: user.password, // Not used by NextAuth directly
        role: user.role,
        createdAt: user.createdAt,
        firstName: user.firstName,
        lastName: user.lastName,
    } as User;
};
