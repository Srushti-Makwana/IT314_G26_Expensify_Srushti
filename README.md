main
# IT314_G26_Expensify
Software Engineering Submissions <br />
 main
Added Lab 5 - Sprint 2 (Class and sequence diagram) 16/09/2024
Addition of Sidenav 08/11/2024
Addition of expense table in the database 11/11/2024
Display of the existing budgets and their progression 11/11/2024
updating the budget list without refreshing the page
skeleton effect added 
added 3 components in dashboard that includes total spend, total budget and number of budgets 14/11/2024
added skeleton effect and enhanced the designs for all the components
Adding bar charts using tools from recharts for better understanding at managing expense
Displaying budget list on dashboard with each budget directing to its own expense page
Displaying expense list on dashboard
Improved the design of budget list in dashboard and also added variables like remaining budget, how much already spend, etc
designed the expense page with a search bar to choose any expense and also sorted all expenses in the table below it
=======
Added Lab 5 - Sprint 2 (Class and sequence diagram) 16/09/2024<br/>
committed table creation backend on neon on 29-10-24<br/>
committed create budget on 10-11-24</br>
committed 4 edited files in create budget folder to pop notification when the budget is created</br>
committed AddExpense on 12-11-24</br>
committed Manage Expense on 13-11-24</br>
committed Delete Budget on 13-11-24</br>
committed Edit Budget on 13-11-24</br>
Added Budgets and Expeses files with little modification</br>
Added recommendation notification in dashboard page</br>
Added Redirecting_budgets on 14-11-24</br>

# Expensify - Expense and Budget Management System  

Expensify is a user-friendly and efficient web application designed to help individuals manage their expenses and budgets effectively. It allows users to track their daily expenditures, categorize expenses, set budgets, and visualize spending patterns.  

## Features  
- **Expense Tracking**: Add, edit, and delete expenses with detailed descriptions and categories.  
- **Budget Management**: Set budgets for different categories and monitor spending limits.  
- **Data Visualization**: Interactive charts and graphs to analyze spending trends over time.  
- **Secure Storage**: Data is securely stored and managed using PostgreSQL databases.  

## Installation  

### Prerequisites  
- Node.js (v16+ recommended)  
- PostgreSQL  
- Git  

### Setup  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/KkavyDave/IT314_G26_Expensify.git 
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Configure the database:  
   - Update the database connection string in `.env` with:  
     ```  
     DATABASE_URL=postgresql://neondb_owner:mLd0ROVfSh3B@ep-patient-mode-a5gw41hr.us-east-2.aws.neon.tech/Expenses-Tracker?sslmode=require  
     ```  

4. Run database migrations:  
   ```bash  
   npm run migrate  
   ```  

5. Start the server:  
   ```bash  
   npm start  
   ```  

6. Open the application in your browser at `http://localhost:3000`.  

## Technologies Used  
- **Frontend**: React.js, TailwindCSS  
- **Backend**: Node.js, Express.js  
- **Database**: PostgreSQL with NeonDB integration  
- **Visualization**: Chart.js  

## Contribution Guidelines  
We welcome contributions to enhance Expensify!  
- Fork the repository and create a feature branch.  
- Commit your changes and open a pull request.  
- Ensure the code is clean, well-documented, and tested.  


## Contact  
For any queries or feedback, feel free to reach out:  
- Maintainer: IT314 G26  
- Email: Any member of G26 on their DA-IICT ID's  
- Repository: [Expensify GitHub Repository](https://github.com/KkavyDave/IT314_G26_Expensify.git)

---  
 main
 main
