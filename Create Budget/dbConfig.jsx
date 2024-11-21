import { neon } from 'C:/Users/Admin/Downloads/expense-tracker/expense-tracker/node_modules/@neondatabase/serverless';
import { drizzle } from 'C:/Users/Admin/Downloads/expense-tracker/expense-tracker/node_modules/drizzle-orm/neon-http';

import * as schema from './schema'

const sql = neon('postgresql://Expense%20Tracker_owner:6yDhXLAB5jfI@ep-soft-cake-a8iu4irs.eastus2.azure.neon.tech/Expense%20Tracker?sslmode=require');
export const db = drizzle(sql,{schema});