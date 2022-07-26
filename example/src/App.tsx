import {FieldsConfig, ObjectControl, ObjectControlForm, ObjectControlState} from "react-object-control";
import {useState} from "react";
import 'react-object-control/dist/styles/simple.css'

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

function App() {
    const [value, setValue] = useState<People>({name: "", age: 0, type: Type.User, job: Job.Builder, custom: "Custom"})
    const [isEditing, setEditing] = useState(true)

    const config: FieldsConfig<People> = {
        name: {label: "Name", placeHolder: "Name input"},
        age: {label: "Age"},
        type: {label: "Type", choices: [[Type.User, "User"], [Type.Admin, "Admin"]]},
        job: {label: "Job", choices: [Job.Builder, Job.Manager]},
        custom: {type: "custom", view: v => <p>{v}</p>}
    }

    return (
        <>
            <h1>ObjectControl</h1>
            <ObjectControl value={value} onChange={v => setValue(v)} config={config} isEditing={isEditing}/>
            <button onClick={() => setEditing(!isEditing)}>Toggle editing</button>

            <h1>ObjectControlForm</h1>
            <ObjectControlForm value={value} onChange={v => setValue(v)} config={config} onSubmit={v => console.log(v)}/>

            <h1>ObjectControl Disabled</h1>
            <ObjectControl value={value} onChange={v => setValue(v)} config={config} state={ObjectControlState.Disabled}/>
        </>
    )
}

export default App
