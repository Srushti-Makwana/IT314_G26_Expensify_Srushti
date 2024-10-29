import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from './schema'

const sql = neon('postgresql://Expense%20Tracker_owner:6yDhXLAB5jfI@ep-soft-cake-a8iu4irs.eastus2.azure.neon.tech/Expense%20Tracker?sslmode=require');
const db = drizzle(sql,{schema});
