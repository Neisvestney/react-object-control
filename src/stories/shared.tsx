import React from "react";
import {FieldsConfig} from "../ObjectControl";

type People = {
    name: string,
    age: 0,
    type: Type,
    job: Job,
    custom: string,
}

enum Type {
    User,
    Admin
}

enum Job {
    Builder = "Builder",
    Manager = "Manager"
}


export const config: FieldsConfig<People> = {
    name: {label: "Name", placeHolder: "Name input"},
    age: {label: "Age"},
    type: {label: "Type", choices: [[Type.User, "User"], [Type.Admin, "Admin"]]},
    job: {label: "Job", choices: [Job.Builder, Job.Manager]},
    custom: {type: "custom", view: v => <p>{v}</p>}
}

export const value: People = {name: "", age: 0, type: Type.User, job: Job.Builder, custom: "Custom"}
