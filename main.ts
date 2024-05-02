#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.green.bold("\n\tWelcome to my app!"));

class student {
  static counter = 10000;
  id: string;
  name: string;
  enrollCourses: string[];
  feesAmount: number;

  constructor(
    id: string,
    name: string,
    enrollCourses: string[],
    feesAmount: number
  ) {
    this.id = id;
    this.name = name;
    1;
    this.enrollCourses = enrollCourses;
    this.feesAmount = feesAmount;
  }
}

let baseID = 10000;
let studentID: string = "";
let continueEnrollment = true;

let students: student[] = [];

do {
  let action = await inquirer.prompt([
    {
      name: "ans",
      type: "list",
      message: "Select an option:\n",
      choices: ["Enroll a student", "Show student status"],
    },
  ]);
  if (action.ans === "Enroll a student") {
    let studentName = await inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "Enter your name:",
      },
    ]);

    let trimmedStudentName = studentName.name.trim().toLowerCase();
    let studentNameCheck = students.map((obj) => obj.name);

    if (studentNameCheck.includes(trimmedStudentName) === false) {
      if (trimmedStudentName !== "") {
        baseID++;
        studentID = "STID" + baseID;

        console.log(chalk.yellow.bold("\n\tYour account has been created"));
        console.log(chalk.gray.bold(`Welcome, ${trimmedStudentName}!`));

        let course = await inquirer.prompt([
          {
            name: "ans",
            type: "list",
            message: "Select a course",
            choices: ["Typescript", "Javascript", "HTML"],
          },
        ]);

        let courseFees = 0;
        switch (course.ans) {
          case "Typescript":
            courseFees = 1000;
            break;

          case "Javascript":
            courseFees = 800;
            break;

          case "HTML":
            courseFees = 500;
            break;
        }
        let confirmCourse = await inquirer.prompt([
          {
            name: "ans",
            type: "comfirm",
            message: "Do you want to enroll in this course",
          },
        ]);
        if (confirmCourse.ans !== true) {
          let Student = new student(
            studentID,
            trimmedStudentName,
            [course.ans],
            courseFees
          );
          students.push(Student);
          console.log(chalk.blue.bold("\n\tYou have enrolled in this course"));
        }
      } else {
        console.log(chalk.blue.bold("\n\tInvalid Name"));
      }
    } else {
      console.log(chalk.blue.bold("\n\tThis name is already exits"));
    }
  } else if (action.ans === "Show student status") {
    if (students.length !== 0) {
      let studentNamescheck = students.map((e) => e.name);
      let selectedStudent = await inquirer.prompt([
        {
          name: "ans",
          type: "list",
          message: "Select name",
          choices: studentNamescheck,
        },
      ]);

      let foundStudent = students.find(
        (Student) => Student.name === selectedStudent.ans
      );
      console.log("Student intormation");
      console.log(foundStudent);
      console.log("\n");
    } else {
      console.log(chalk.blue.bold("\n\tRecord is emty"));
    }
  }

  let userComfirm = await inquirer.prompt([
    {
      name: "ans",
      type: "confirm",
      message: "Do you want to comfirm?",
    },
  ]);
  if (userComfirm.ans === false) {
    continueEnrollment = false;
  }
} while (continueEnrollment);

console.log(chalk.yellow.bold(`\n\tThanks for using my app..`));
