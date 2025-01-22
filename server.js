// // //to importing the http module which is inbuilt module in nodeJS

// // //createserver is the function inside the http module
// //         const http = require('http');
// //         const calculate = require("./calculator")
// //         const a=10,b=20;

// //         const server = http.createServer((req, res) => {  //higher order function(createServer)
// //             res.writeHead(200,{"Content-Type": "text/html"});   
// //             const add = calculate.add(a,b);
// //             const sub = calculate.sub(a,b);
// //             const mul = calculate.mul(a,b);
// //             const div = calculate.div(a,b);
// //             res.write(`<p>a = ${a}</p>`);
// //             res.write(`<p>b = ${b}</p>`);
// //             res.write(`<p>Addition of ${a} and ${b} is ${add}</p>`)
// //             res.write(`<p>Subtraction of ${a} and ${b} is ${sub}</p>`)
// //             res.write(`<p>Multiplication of ${a} and ${b} is ${mul}</p>`)
// //             res.write(`<p>Division of ${a} and ${b} is ${div}</p>`)
// //         });

// //         server.listen(3000, () => {
// //             console.log("Server running at http://127.0.0.1:3000/");
// //         });

//         const fs = require("fs");

//         // fs.readFile("sample.txt", "utf8" , (err,data) => {
//         //     if(err){
//         //         console.error(err)
//         //         return 
//         //     }
//         //     console.log(data)
//         // })


// // Note : if the file already existe then it will be replaced by the given text else it will create a new file
// //with the given name and write the txt inside it 
//         // fs.writeFile("sample.txt" , "my boyfriend is an alien" , (err) => {
//         //     if(err){
//         //         console.error(err);
//         //     }
//         // });

//         // fs.writeFile("sample1.txt" , "if you are bad ,I'm your dad" , (err) => {
//         //     if(err){
//         //         console.error(err);
//         //     }
//         // });

//         const newObj = {
//             "name" : "banu",
//             "age" : 19 ,
//             "city" : "Pondy",
//             "amount" : 50000
//         }

//     // //create 
//     //     fs.readFile('sample.json' , 'utf8' , (err,data) => {
//     //         if(err){
//     //             console.error(err)
//     //             return 
//     //         }
//     //         const json = JSON.parse(data)  // this will write the data in hte JSON format rather than string
//     //         console.log(json)
//     //         // if(Array.isArray(json)){
//     //         //     json.push(newObj);
//     //         // }
//     //         // else{
//     //         //     console.log("Json is not in the Array format");
//     //         // }
//     //         console.log(json)

//     //         //to write it in the file itself
//     //         const newJson = [...json,newObj];
//     //         fs.writeFile("sample.json" , JSON.stringify(newJson), (err) => {
//     //             if(err){
//     //                 console.error(err)
//     //             }
//     //         })
//     //     })

//     //to delete the object
//                 fs.readFile('sample.json' , 'utf8' , (err,data) => {
//                         if(err){
//                             console.error(err)
//                             return 
//                         }
//                         const json = JSON.parse(data)  // this will write the data in hte JSON format rather than string
//                         console.log(json)
            
//                         //to write it in the file itself
//                         const newJson = json.filter((data) => data.name !="Mukesh")
//                         fs.writeFile("sample.json" , JSON.stringify(newJson), (err) => {
//                             if(err){
//                                 console.error(err)
//                             }
//                         })
//                     })


const fs = require("fs");
const filePath = "sample.json";
function createStudent(newStudent) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const json = JSON.parse(data);
    json.push(newStudent);
    fs.writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
      } else {
        console.log("New student added successfully!");
      }
    });
  });
}

function readStudents() {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const json = JSON.parse(data);
    console.log("Students List:", json);
  });
}

function updateStudent(rollNo, updatedData) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const json = JSON.parse(data);
    const updatedJson = json.map((student) =>
      student.rollNo === rollNo ? { ...student, ...updatedData } : student
    );
    fs.writeFile(filePath, JSON.stringify(updatedJson, null, 2), (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
      } else {
        console.log(`Student with roll number ${rollNo} updated successfully!`);
      }
    });
  });
}

function deleteStudent(rollNo) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const json = JSON.parse(data);
    const updatedJson = json.filter((student) => student.rollNo !== rollNo);
    fs.writeFile(filePath, JSON.stringify(updatedJson, null, 2), (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
      } else {
        console.log(`Student with roll number ${rollNo} deleted successfully!`);
      }
    });
  });
}


createStudent({
  studentName: "Rishi",
  rollNo: 105,
  dob: "2002-07-10",
  dept: "Civil",
});

readStudents();

updateStudent(102, { studentName: "Rishi", dept: "EEEm" });

deleteStudent(103);
