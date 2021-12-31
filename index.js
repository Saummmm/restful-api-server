const express = require("express");
let jobList = require("./jobs.json");

const app = express();

//dynamic handling

app.get("/categories", (req, res) => {
  let countedCats = []; //counted categories array
  let cats = []; //array of just categories
  jobs = Object.values(jobList);
  for (let j of jobs) cats = cats.concat(j.categories); //taking each object from hivlist and selecting just categories
  cats.sort(); //sort for arrays
  let count = 0;
  let current = "";
  for (let c of cats) {
    //since array is ordered, count each time a category is repeated
    if (c != current) {
      countedCats.push({ category: current, count: count }); //when the repeat is done push the object to the counted array
      count = 1; //set up for next category
      current = c;
    } else {
      count++;
    }
  }
  countedCats.shift(); //first element added is an empty string because of algorithm used
  res.json(countedCats);
});

app.get("/jobsInCity", (req, res) => {
  let city = req.query.city; //get city from string query
  let vals = Object.values(jobList); //array of values
  let jobs = Object.entries(jobList); //array of jobs
  let index = 0;
  let jobsFiltered = []; //output array
  for (let v of vals) {
    //loop through, if title value in object has the city, add it to output array
    if (v["title"].includes(city)) {
      index = vals.indexOf(v);
      jobsFiltered.push(jobs[index]);
    }
  }
  res.json(jobsFiltered);
});

app.get("/:category", (req, res) => {
  let category = req.params.category; //get category from param
  let vals = Object.values(jobList); //array of values
  let jobs = Object.entries(jobList); //array of jobs
  let index = 0;
  let jobsFiltered = []; //output array
  for (let v of vals) {
    //loop through, if categories array has required category, add it to output array
    if (v["categories"].includes(category)) {
      index = vals.indexOf(v);
      jobsFiltered.push(jobs[index]);
    }
  }
  res.json(jobsFiltered);
});

app.listen(80); //listening port
