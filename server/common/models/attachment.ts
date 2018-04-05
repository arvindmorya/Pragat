"use strict";
const xlsxModule = require("xlsx");
const path = require("path");
var fs = require('fs');

export = function(Attachment: any) {
  Attachment.afterRemote("upload", function (ctx: any, unused: any, next: any) {
    var saral_report = ctx.result.result.files.saral_report
    var error = {
      "statusCode" : 0,
      "message": ""
    }
    if(saral_report && saral_report.length){
      var filePath = "../../files/saral_report/" + saral_report[0].name
      var relativePath = path.join(__dirname, filePath)
      if(saral_report[0].name.split(".")[1] != "xlsx"){
        error.statusCode = 400
        error.message = "File is not in xlsx extension"
        fs.unlink(relativePath);
        return ctx.res.status(error.statusCode).send(error)
      }
      else{
        const workbook = xlsxModule.readFile(relativePath)
        const sheetNameList = workbook.SheetNames;
        sheetNameList.forEach(function(y:any) {
          let worksheet = workbook.Sheets[y];
          let headers = {};
          let data = [];
          let academicYear;
          let schoolUdise;
          let standard;
          let division;
          let subject;
          for (const z in worksheet) {
            if (z.toString()[0] === "A" || z.toString()[0] === "B") {
              if (z[0] === "!") { continue; }
              // parse out the column, row, and value
              let tt = 4;
              for (let i = 0; i < z.length; i++) {
                  if (!isNaN(z[i])) {
                      tt = i;
                      break;
                  }
              }
              if (z.toString() === "A1") {
                academicYear = worksheet[z].v.split(":")[1].trim();
              }
              if (z.toString() === "B1") {
                schoolUdise = worksheet[z].v.split(":")[1].trim();
              }
              if (z.toString() === "A3") {
                standard = worksheet[z].v.split(":")[1].trim().split(" ")[0];
              }
              if (z.toString() === "B3") {
                division = worksheet[z].v.split(":")[1].trim();
              }
              if (z.toString() === "B2") {
                subject = worksheet[z].v.split(":")[1].trim();
              }
              let col = z.substring(0, tt);
              let row = parseInt(z.substring(tt));
              let value = worksheet[z].v;
              if (row === 4 && value) { // store header names
                if(value === "Student ID"){
                  headers[col] = "udise_id";
                }
                if(value === "Student Name"){
                  headers[col] = "name";
                }
                continue;
              }
              if (!data[row]) { data[row] = {}; }
              data[row][headers[col]] = value;
            }
          }
          var classObj = {
            "standard": standard,
            "division": division,
            "academicYear": academicYear,
            "subject": subject,
            "teacherId": 1 // To be changed to current user_id
          }
          for (let i = 0; i < 7; i++) {
            data.shift();
          }
          if(!standard || !division || !academicYear || !subject || !data.length){
            error.statusCode = 400
            error.message = "File does not match the standard template format"
            fs.unlink(relativePath);
            return ctx.res.status(error.statusCode).send(error)
          }
          else{
            Attachment.app.models.class.create(classObj, 
              function(err: Error, classes: any) {
                if(err){
                  console.log("Error while creating class: ", err);
                  error.statusCode = 500
                  error.message = "Class could not be added"
                  fs.unlink(relativePath);
                  return ctx.res.status(error.statusCode).send(error)
                }
                else{
                  Attachment.app.models.school.find({where:{"udise_id": schoolUdise}}, function(err: Error, schools){
                    if(err){
                      console.log("Error while fetching school: ", err)
                      error.statusCode = 500
                      error.message = "School could not be fetched"
                      fs.unlink(relativePath);
                      return ctx.res.status(error.statusCode).send(error)
                    }
                    else{
                      if(schools && schools.length){
                        let school = schools[0];
                        Attachment.app.models.schoolsClasses.create({"schoolId": school.id, "classId": classes.id}, function(err:Error, schoolClass: any){
                          if(err){
                            console.log("Error while creating schoolsClasses: ", err)
                            error.statusCode = 500
                            error.message = "Classes could not be added for school " + school.name
                            fs.unlink(relativePath);
                            return ctx.res.status(error.statusCode).send(error)
                          }
                          else{
                            classes.students.create(data, function(err:Error, students: any){
                              if(err){
                                console.log("Error while creating students: ", err)
                                error.statusCode = 500
                                error.message = "Students could not be added for school " + school.name + " and class " + classes.standard
                                fs.unlink(relativePath);
                                return ctx.res.status(error.statusCode).send(error)
                              }
                              next();
                            });
                          }
                        })
                      }
                      else{
                        console.log("No School Found");
                        error.statusCode = 400
                        error.message = "School not found"
                        fs.unlink(relativePath);
                        return ctx.res.status(error.statusCode).send(error)
                      }
                    }
                  })
                }
            });
          }
        });
      }
    }
    else{
      if(error.statusCode != 0){
        // ctx.res.statusCode = error.statusCode
        fs.unlink(relativePath);
        return ctx.res.status(error.statusCode).send(error)
      }
      next();
    }
  });
}

