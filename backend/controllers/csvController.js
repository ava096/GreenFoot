const csvtojson = require("csvtojson");
const { Parser } = require("json2csv");
const fs = require("fs");

// to add a date/timestamp each time script is ran, so files will not be overwritten
const date = new Date();
const timestamp = date.toISOString().replace(/[-:.]/g, "");

// const values to be used in functions
const CSV_INPUT_PATH = "../csv/odTrees.csv";
const CLEANED_DATA_PATH = `../csv/ProcessedData_${timestamp}.csv`;
const PROBLEM_DATA_PATH = `../csv/DataIssuesReport_${timestamp}.csv`;

function cleanRecord(record) {
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

  //handle numerical fields
  const numericalFields = [
    "DIAMETERinCENTIMETRES",
    "SPREADRADIUSinMETRES",
    "TREETAG",
    "TREEHEIGHTinMETRES",
  ];

  //check numerical fields for negatives or blanks
  numericalFields.forEach((field) => {
    if (record[field]) {
      let value = Number(record[field]);
      // if a value is negative, its absolute value will be used instead ie. positive
      record[field] = value < 0 ? Math.abs(value) : value;
    } else {
      // if a field is empty, it will be set to null
      record[field] = null;
    }
  });

  // Check other fields for problematic string values
  for (let key in record) {
    if (
      !numericalFields.includes(key) &&
      ["N/A", "Not known", ""].includes(record[key])
    ) {
      record[key] = "Data not provided";
    }
  }

  return record;
}

function hasProblem(record) {
  return Object.values(record).some((value) =>
    ["Data not provided", "N/A", "Not known", "", null].includes(value)
  );
}
// Read in csv file
csvtojson()
  .fromFile(CSV_INPUT_PATH)
  .then((csvData) => {
    //array for all processed data
    const processedData = [];
    //for data that is particularly problematic
    const problemData = [];

    //loop through each record in csv and clean accordingly
    csvData.forEach((rawRecord) => {
      const record = cleanRecord(rawRecord);

      //push all data to processed array
      processedData.push(record);

      //push problem data to act as a report
      if (hasProblem(record)) {
        problemData.push(record);
      }
    });

    //Convert data back to CSV
    const parser = new Parser();

    //for clean data
    const processedCsv = parser.parse(processedData);
    fs.writeFileSync(CLEANED_DATA_PATH, processedCsv);

    //for dirty data
    const dataReportCsv = parser.parse(problemData);
    fs.writeFileSync(PROBLEM_DATA_PATH, dataReportCsv);
  });
