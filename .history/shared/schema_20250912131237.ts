import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = sqliteTable("products", {
  id: text("id").primaryKey().default(sql`lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)))`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  origin: text("origin").notNull(),
  process: text("process").notNull(),
  priceUsd: real("price_usd").notNull(),
  priceEth: real("price_eth").notNull(),
  priceUsdc: real("price_usdc").notNull(),
  imageUrl: text("image_url").notNull(),
  rating: real("rating").notNull(),
  inventory: integer("inventory").notNull().default(0),
  createdAt: integer("created_at", { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey().default(sql`lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)))`),
  walletAddress: text("wallet_address"),
  email: text("email"),
  items: text("items", { mode: 'json' }).notNull(),
  totalUsd: real("total_usd").notNull(),
  totalEth: real("total_eth"),
  totalUsdc: real("total_usdc"),
  paymentMethod: text("payment_method").notNull(), // 'crypto' | 'card'
  paymentStatus: text("payment_status").notNull().default('pending'), // 'pending' | 'confirmed' | 'failed'
  transactionHash: text("transaction_hash"),
  createdAt: integer("created_at", { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
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
