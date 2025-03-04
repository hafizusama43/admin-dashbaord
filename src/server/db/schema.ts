import { pgTable, serial, text, numeric, integer, timestamp, pgEnum, boolean } from "drizzle-orm/pg-core";

// Define status ENUM
export const statusEnum = pgEnum("status", ["active", "inactive", "archived"]);

// Define ENUM for user roles
export const roleEnum = pgEnum("role", ["admin", "manager", "staff", "viewer"]);

// Define Products Table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  name: text("name").notNull(),
  status: statusEnum("status").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  stock: integer("stock").notNull(),
  availableAt: timestamp("available_at").notNull(),
});

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: roleEnum("role").notNull().default("viewer"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isDeleted: boolean("is_deleted").default(false).notNull(),
});

// TypeScript types
export type SelectProduct = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;


export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;