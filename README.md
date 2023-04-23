# react-vite-ts-randomuserme-table-example
React frontend loading [randomuser.me](https://randomuser.me/) data: make a table and search as well as filter users, then download it as csv   

to import the csv I'm using the react-csv package, besides types and vite obv it's fairly vanilla, in hinsight if you are going to implement a table with search, filters and sorts like this project you should probably use [React-Table](https://react-table-v7.tanstack.com/)  

TL;DR the states are mainly used to keep track of the search items so the function in utils/filter can filter everything on the available data with every render but if you need to pass the data then I recommend expanding the onClick and handleChange functions and keep the data in a state  

this is a vite project so you need to npm i then you can run it with npm run dev, check scripts  

# [LIVE EXAMPLE](https://dainty-crostata-b946b2.netlify.app/)