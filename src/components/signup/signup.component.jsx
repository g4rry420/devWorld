import React, { useState } from 'react'

import "./signup.styles.css"
import CustomButton from "../custom-button/custom-button.component"
import FormInput from "../form-input/form-input.component"
import Heading from "../Heading/heading.component"
import { auth, createUserProfileDocument } from "../../firebase/firebase.config"

export default function SignUp() {
    const [signupForm, setSignUpForm] = useState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        techStack: "",
        portfolio: "",
        linkedIn: "",
        twitter: "",
        github: "",
        instagram: "",
        aboutYou: "",
    })

    const handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password,confirmPassword, role, techStack, portfolio
                , linkedIn, twitter, github, instagram, aboutYou
        } = signupForm;

        if(password !== confirmPassword){
            alert("Passwords don't match");
            return;
        }

        const dataToSend = {
            displayName,
            email,
            role, techStack, portfolio,
            linkedIn, twitter, github, instagram, aboutYou
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, dataToSend);
            setSignUpForm({
                displayName: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "",
                techStack: "",
                portfolio: "",
                linkedIn: "",
                twitter: "",
                github: "",
                instagram: "",
                aboutYou: ""
            })
        } catch (error) {
            console.log(error);
        }

    }

    const handleChange = event => {
        const { name, value } = event.target;
        setSignUpForm({ ...signupForm, [name]: value})
    } 

    const { displayName, email, password,confirmPassword, role,techStack, portfolio, linkedIn,twitter, instagram, github,aboutYou  } = signupForm;
    return (
        <div className="col-md-9">
            <div className="heading-container-in-login">
                <Heading title="SignUp" display="display-4" h1="heading-in-login-form" />
            </div>
            <form className="mt-5 signup-form-container" onSubmit={handleSubmit}>
                <h3 className="display-4">User Info</h3>
                <FormInput name="displayName" type="text" handleChange={handleChange} value={displayName} placeholder="Full Name" required="required" />
                <FormInput name="email" type="email" handleChange={handleChange} value={email} placeholder="Email" required="required" />
                <FormInput name="password" type="password" handleChange={handleChange} value={password} placeholder="Password" required="required" />
                <FormInput name="confirmPassword" type="password" handleChange={handleChange} value={confirmPassword} placeholder="Confirm Password" required="required" />
                <h3 className="display-4">Skills</h3>
                <div className="tech-container">
                    <FormInput name="role" type="text" handleChange={handleChange} value={role} placeholder="Role" required="required" />
                    <FormInput name="techStack" type="text" handleChange={handleChange} value={techStack} placeholder="Tech Stack" required="required" />
                </div>
                <h3 className="display-4">Social Media</h3>
                <FormInput name="portfolio" type="text" handleChange={handleChange} value={portfolio} placeholder="Portfolio Site" />
                <div className="social-media-container">
                    <FormInput name="linkedIn" type="text" handleChange={handleChange} value={linkedIn} placeholder="LinkedIn URL" />
                    <FormInput name="twitter" type="text" handleChange={handleChange} value={twitter} placeholder="Twitter URL" />
                    <FormInput name="github" type="text" handleChange={handleChange} value={github} placeholder="GitHub URL" />
                    <FormInput name="instagram" type="text" handleChange={handleChange} value={instagram} placeholder="Instagram URL" />
                </div>
                <h3 className="display-4 mt-3">About You</h3>
                <div className="form-group">
                    <textarea onChange={handleChange} name="aboutYou" value={aboutYou} className="form-control" placeholder="About You" rows="4" required></textarea>
                </div>
                <div className="text-center my-3">
                    <CustomButton title="SignUp" button="login-button" type="submit" required />
                </div>
            </form>
        </div>
    )
}
