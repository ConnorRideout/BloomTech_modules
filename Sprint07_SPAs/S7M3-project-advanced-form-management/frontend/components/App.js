// ❗ The ✨ TASKS inside this component are NOT IN ORDER.
// ❗ Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as yup from "yup"

const e = { // This is a dictionary of validation error messages.
    // username
    usernameRequired: 'username is required',
    usernameMin: 'username must be at least 3 characters',
    usernameMax: 'username cannot exceed 20 characters',
    // favLanguage
    favLanguageRequired: 'favLanguage is required',
    favLanguageOptions: 'favLanguage must be either javascript or rust',
    // favFood
    favFoodRequired: 'favFood is required',
    favFoodOptions: 'favFood must be either broccoli, spaghetti or pizza',
    // agreement
    agreementRequired: 'agreement is required',
    agreementOptions: 'agreement must be accepted',
}

const defaultFormValues = { username: "", favLanguage: "", favFood: "", agreement: false }

// ✨ TASK: BUILD YOUR FORM SCHEMA HERE
// The schema should use the error messages contained in the object above.
const formSchema = yup.object().shape({
    username: yup
        .string()
        .trim()
        .required(e.usernameRequired)
        .min(3, e.usernameMin)
        .max(20, e.usernameMax),
    favLanguage: yup
        .string()
        .required(e.favLanguageRequired)
        .oneOf(['javascript', 'rust'], e.favLanguageOptions),
    favFood: yup
        .string()
        .required(e.favFoodRequired)
        .oneOf(['broccoli', 'spaghetti', 'pizza'], e.favFoodOptions),
    agreement: yup
        .boolean()
        .required(e.agreementRequired)
        .oneOf([true], e.agreementOptions),
})

export default function App() {
    // ✨ TASK: BUILD YOUR STATES HERE
    // You will need states to track (1) the form, (2) the validation errors,
    // (3) whether submit is disabled, (4) the success message from the server,
    // and (5) the failure message from the server.
    const [formValues, setFormValues] = useState(defaultFormValues)
    const [validErrors, setValidErrors] = useState({ username: "", favLanguage: "", favFood: "", agreement: "" })
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const [successMsg, setSuccessMsg] = useState()
    const [failMsg, setFailMsg] = useState()

    // ✨ TASK: BUILD YOUR EFFECT HERE
    // Whenever the state of the form changes, validate it against the schema
    // and update the state that tracks whether the form is submittable.
    useEffect(() => {
        formSchema.isValid(formValues)
            .then((isValid) => {
                setSubmitDisabled(!isValid)
            })
    }, [formValues])

    const onChange = evt => {
        // ✨ TASK: IMPLEMENT YOUR INPUT CHANGE HANDLER
        // The logic is a bit different for the checkbox, but you can check
        // whether the type of event target is "checkbox" and act accordingly.
        // At every change, you should validate the updated value and send the validation
        // error to the state where we track frontend validation errors.
        const { name, value, checked, type } = evt.target
        const newValue = type === "checkbox" ? checked : value
        setFormValues({ ...formValues, [name]: newValue })
        yup
            .reach(formSchema, name)
            .validate(newValue)
            .then(() => {
                setValidErrors({ ...validErrors, [name]: "" })
            })
            .catch(err => {
                setValidErrors({ ...validErrors, [name]: err.errors[0] })
            })
    }

    const onSubmit = evt => {
        // ✨ TASK: IMPLEMENT YOUR SUBMIT HANDLER
        // Lots to do here! Prevent default behavior, disable the form to avoid
        // double submits, and POST the form data to the endpoint. On success, reset
        // the form. You must put the success and failure messages from the server
        // in the states you have reserved for them, and the form
        // should be re-enabled.
        evt.preventDefault()
        setSubmitDisabled(true)
        axios.post("https://webapis.bloomtechdev.com/registration", formValues)
            .then(res => {
                setSuccessMsg(res.data.message)
                setFormValues(defaultFormValues)
                setTimeout(() => setSuccessMsg(), 4000)
            })
            .catch(err => {
                setFailMsg(err.data.message)
                setTimeout(() => setFailMsg(), 4000)
            })
    }

    return (
        <div> {/* TASK: COMPLETE THE JSX */}
            <h2>Create an Account</h2>
            <form onSubmit={onSubmit}>
                {successMsg && <h4 className="success">{successMsg}</h4>}
                {failMsg && <h4 className="error">{failMsg}</h4>}

                <div className="inputGroup">
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Type Username"
                        onChange={onChange}
                        value={formValues.username}
                    />
                    {validErrors.username && <div className="validation">{validErrors.username}</div>}
                </div>

                <div className="inputGroup">
                    <fieldset>
                        <legend>Favorite Language:</legend>
                        <label>
                            <input
                                type="radio"
                                name="favLanguage"
                                value="javascript"
                                onChange={onChange}
                                checked={formValues.favLanguage === "javascript"}
                            />
                            JavaScript
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="favLanguage"
                                value="rust"
                                onChange={onChange}
                                checked={formValues.favLanguage === "rust"}
                            />
                            Rust
                        </label>
                    </fieldset>
                    {validErrors.favLanguage && <div className="validation">{validErrors.favLanguage}</div>}
                </div>

                <div className="inputGroup">
                    <label htmlFor="favFood">Favorite Food:</label>
                    <select id="favFood" name="favFood" onChange={onChange} value={formValues.favFood}>
                        <option value="">-- Select Favorite Food --</option>
                        <option value="pizza">Pizza</option>
                        <option value="spaghetti">Spaghetti</option>
                        <option value="broccoli">Broccoli</option>
                    </select>
                    {validErrors.favFood && <div className="validation">{validErrors.favFood}</div>}
                </div>

                <div className="inputGroup">
                    <label>
                        <input
                            id="agreement"
                            type="checkbox"
                            name="agreement"
                            onChange={onChange}
                            checked={formValues.agreement}
                        />
                        Agree to our terms
                    </label>
                    {validErrors.agreement && <div className="validation">{validErrors.agreement}</div>}
                </div>

                <div>
                    <input
                        type="submit"
                        disabled={submitDisabled}
                    />
                </div>
            </form>
        </div>
    )
}
