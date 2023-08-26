const csvtojson = require("csvtojson");
const { Parser } = require("json2csv");
const fs = require("fs");

// to add a date/timestamp each time script is ran, so files will not be overwritten
const date = new Date();
const timestamp = date.toISOString().replace(/[-:.]/g, "");

// const values to be used in functions
const CSV_INPUT_PATH = "../csv/odTrees.csv";
const PROCESSED_DATA_PATH = `../csv/ProcessedData_${timestamp}.csv`;

// Goes through each record and cleans it accordingly
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
      ["N/A", "Not known", "Not Known", ""].includes(record[key])
    ) {
      record[key] = "Data not provided";
    }
  }

  // find the level of concern for the record
  record.LEVELOFCONCERN = determineLevelOfConcern(record);

  return record;
}

// Determine the level of concern for the data integrity of a record
function determineLevelOfConcern(record) {
  let countDataNotProvided = 0;

  for (let key in record) {
    if (record[key] === "Data not provided" || record[key] === null) {
      countDataNotProvided++;
    }
  }

  if (
    countDataNotProvided >= 3 ||
    record.SPECIES === "Data not provided" ||
    record.SPECIESTYPE === "Data not provided"
  ) {
    return "Red";
  } else if (
    countDataNotProvided === 2 ||
    record.SPECIES.includes("Mixed") ||
    record.SPECIESTYPE.includes("Mixed")
  ) {
    return "Amber";
  } else if (
    countDataNotProvided === 1 ||
    record.TREEHEIGHTinMETRES === 0 ||
    record.TREESPREADRADIUSinMETRES === 0 ||
    record.TREEDIAMETERinCENTIMETRES === 0 ||
    record.SPECIES.includes("(Specific Type Unknown)")
  ) {
    return "Yellow";
  } else {
    return "Green";
  }
}

// Read in csv file
csvtojson()
  .fromFile(CSV_INPUT_PATH)
  .then((csvData) => {
    //array for all processed data
    const processedData = [];

    //loop through each record in csv and clean accordingly
    csvData.forEach((rawRecord) => {
      const record = cleanRecord(rawRecord);

      //push all data to processed array
      processedData.push(record);
    });

    //Convert data back to CSV
    const parser = new Parser();

    try {
      const processedCsv = parser.parse(processedData);
      fs.writeFileSync(PROCESSED_DATA_PATH, processedCsv);
    } catch (error) {
      console.error("Error writing the cleaned data to CSV:", error);
    }
  });
