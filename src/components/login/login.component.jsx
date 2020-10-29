import React,{ useState } from 'react'

import "./login.styles.css"
import CustomButton from "../custom-button/custom-button.component"
import FormInput from "../form-input/form-input.component"
import Heading from "../Heading/heading.component"
import { auth } from "../../firebase/firebase.config"

export default function LogIn() {

    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const [loginError, setLoginError] = useState("");

    const handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = login;
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.log(error.message);
            setLoginError(error.message)
        }

        setLogin({ email: "", password: "" });
    }

    const handleChange = event => {
        const { value, name } = event.target;
        setLogin({...login, [name]: value});
    }

    const { email, password } = login;



    return (
        <div className="login-container col-md-9">
            <div className="heading-container-in-login">
                <Heading title="LogIn" display="display-4" h1="heading-in-login-form" />
            </div>
            <form className="mt-5" onSubmit={handleSubmit}>
                <FormInput name="email" handleChange={handleChange} value={email} type="email" placeholder="Email" required="required" />
                <FormInput name="password" handleChange={handleChange} value={password} type="password" placeholder="Password" required="required" />
                <div className="text-center d-md-flex justify-content-around both-buttons-container">
                    <CustomButton title="LogIn" button="login-button" />
                </div>
                <p>{loginError}</p>
            </form>
        </div>
    )
}
