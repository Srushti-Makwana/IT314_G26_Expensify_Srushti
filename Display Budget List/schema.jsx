import { serial, varchar, integer } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

// Define the Budgets table
export const Budgets = pgTable('budgets', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: varchar('amount').notNull(),
    icon: varchar('icon'),
    createdBy: varchar('createdBy').notNull()
});

// Define the Expenses table
export const Expenses = pgTable('expenses', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: varchar('amount').notNull(),
    budgetId: integer('budgetId').references(() => Budgets.id),
    createdBy: varchar('createdBy').notNull(),
});
