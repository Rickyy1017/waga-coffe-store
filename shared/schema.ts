import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  origin: text("origin").notNull(),
  process: text("process").notNull(),
  priceUsd: decimal("price_usd", { precision: 10, scale: 2 }).notNull(),
  priceEth: decimal("price_eth", { precision: 18, scale: 8 }).notNull(),
  priceUsdc: decimal("price_usdc", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  inventory: integer("inventory").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  walletAddress: text("wallet_address"),
  email: text("email"),
  items: jsonb("items").notNull(),
  totalUsd: decimal("total_usd", { precision: 10, scale: 2 }).notNull(),
  totalEth: decimal("total_eth", { precision: 18, scale: 8 }),
  totalUsdc: decimal("total_usdc", { precision: 10, scale: 2 }),
  paymentMethod: text("payment_method").notNull(), // 'crypto' | 'card'
  paymentStatus: text("payment_status").notNull().default('pending'), // 'pending' | 'confirmed' | 'failed'
  transactionHash: text("transaction_hash"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

// export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
// export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Cart item type for frontend
export const CartItem = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
  product: z.object({
    id: z.string(),
    name: z.string(),
    priceUsd: z.string(),
    priceEth: z.string(),
    priceUsdc: z.string(),
    imageUrl: z.string(),
  })
});

export type CartItem = z.infer<typeof CartItem>;
