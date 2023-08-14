const csvtojson = require("csvtojson");
const { Parser } = require("json2csv");
const fs = require("fs");

// Read in csv file
csvtojson()
  .fromFile("../csv/odTrees.csv")
  .then((csvData) => {
    //array for cleaned data
    const cleanedData = [];
    //for dirty data
    const problemData = [];

    //loop through each record in csv and clean accordingly
    csvData.forEach((record) => {
      let hasProblem = false;

      // Split TREETYPE
      if (record.TYPEOFTREE === "ParkTree") {
        record.TYPEOFTREE = "Park Tree";
      } else if (record.TYPEOFTREE === "StreetTree") {
        record.TYPEOFTREE = "Street Tree";
      }

      //If a record has (type) under SPECIES, replace this with (Specific Type Unknown)
      //This is more descriptive and helpful to users who may be able to identify the specific type
      if (record.SPECIES && record.SPECIES.includes("(type)")) {
        record.SPECIES = record.SPECIES.replace(
          "(type)",
          "(Specific Type Unknown)"
        );
      }

      //make sure any negative values in certain fields are converted to positive
      [
        "DIAMETERinCENTIMETRES",
        "SPREADRADIUSinMETRES",
        "TREEHEIGHTinMETRES",
      ].forEach((field) => {
        //checks the field exists and the value is negative
        if (record[field] && Number(record[field]) < 0) {
          //Math.abs() takes absolute value of its argument and if negative,
          //returns the positive version
          record[field] = Math.abs(Number(record[field]));
        }
      });

      //Check for blank fields, "N/A" or "Not Known"
      for (let key in record) {
        if (
          record[key] === "N/A" ||
          record[key] === "Not Known" ||
          record[key] === ""
        ) {
          hasProblem = true;
          break;
        }
      }

      //Push to correct array depending on whether hasProblem is true or false
      if (hasProblem) {
        problemData.push(record);
      } else {
        cleanedData.push(record);
      }
    });

    //Convert data back to CSV
    const parser = new Parser();

    //for clean data
    const cleanedCsv = parser.parse(cleanedData);
    fs.writeFileSync("../csv/CleanedData.csv", cleanedCsv);

    //for dirty data
    const problemCsv = parser.parse(problemData);
    fs.writeFileSync("../csv/ProblemData.csv", problemCsv);
  });
