import { defineConfig } from "drizzle-kit";
export default ({
    dialect: "postgresql",
    schema: "C:/Users/Admin/Downloads/expense-tracker/expense-tracker/app/utils/schema.jsx",
   
    dbCredentials: {
        url:'postgresql://Expense%20Tracker_owner:6yDhXLAB5jfI@ep-soft-cake-a8iu4irs.eastus2.azure.neon.tech/Expense%20Tracker?sslmode=require',
    }
});
