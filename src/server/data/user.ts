import { eq, and } from "drizzle-orm";
import { users } from "../db/schema"; // Import schema
import { User } from "next-auth";
import { db } from "../db/drizzle";
import bcrypt from "bcryptjs";

// Function to get a user by email
export const getUserByEmail = async (email: string): Promise<User | null> => {
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
      username: users.username,
    })
    .from(users)
    .where(and(eq(users.email, email), eq(users.isDeleted, false)))
    .limit(1);

  if (result.length === 0) {
    return null;
  }
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
    username: user.username,
  } as User;
};

export const createUser = async (data: Record<string, string>): Promise<boolean> => {
  const user = await db
    .insert(users)
    .values([
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: await bcrypt.hash(data.password, 10),
        role: "admin",
        createdAt: new Date(),
        isDeleted: false,
        username: data.username,
      },
    ])
    .execute();
  return user.rowCount > 0 ? true : false;
};
