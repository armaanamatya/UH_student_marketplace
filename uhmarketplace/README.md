## Starting the program for development
1. Make sure to run "npm install" in this folder /UHMARKETPLACE/uhmarketplace. Check your terminal to ensure you are in the correct path. When you input "ls" in the terminal, you should see all the files related to the program like "prisma", "src", .etc.

2. Once you have installed everything, you need to set up your mySQL database locally otherwise this application will not work for certain features.
If you already don't have mySQL installed, please watch this video from fireship on how to set it up. 
https://www.youtube.com/watch?v=Cz3WcZLRaWc&t=300s
I recommend watching section 7-9 in order to create your own local database. 

3. Once you set up the DB, check out .env.example because now we will connect the DB to this application. 

4. Run "npx prisma db push" to push the settings into prisma. Once finished, we need to seed the DB with data to experiment with. Run "npx prisma db seed" and now your DB should have data. Check the DB by using the extension from the fireship video and click your connection then the database you created. There should be tables that you can click on and if you click the magnifying glass, you should see the data that was seeded in. 

5. Double check to see if you have the ENV files set up correctly. Errors will occur if you do not. 

6. You should be able to do "npm run dev" in the terminal and start checking out the application. The majority of the front-end is in (cb) but it is up to the team to decide how they want to structure the project. 