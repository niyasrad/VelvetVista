import { useState } from "react";
import { SignContent, SignFieldInstance, SignFieldSubmit, SignFieldsWrapper, SignWrapper, SignerInsance } from "./user.styles";
import Glass from "../../components/glass/Glass";
import SignBG from "../../components/signbg/SignBG";
import { ThemeEnum, useThemeContext } from "../../contexts/Theme.context";

import dark_logo from '../../assets/logo/logo-dark.svg'
import light_logo from '../../assets/logo/logo-light.svg'
import { useNavigate } from "react-router";

function SignFields() {

    const [handleEmail, setHandleEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const navigate = useNavigate()

    const handleSubmit: () => void = () => {
        if (!handleEmail || !password) {
            
        }
        navigate('/')
    }

    return (
        <SignFieldsWrapper>
            <SignFieldInstance 
                value={handleEmail}
                onChange={ (e) => setHandleEmail(e.target.value) }
                placeholder="E-mail or Username"
                type="text"
            />
            <SignFieldInstance 
                value={password}
                onChange={ (e) => setPassword(e.target.value) }
                placeholder="Password"
                type="password"
            />
            <SignFieldSubmit onClick={handleSubmit} >SIGN IN</SignFieldSubmit>
        </SignFieldsWrapper>
    )
    
}

export default function SignIn() {

    const { theme } = useThemeContext()

    return (
        <SignWrapper>
            <SignBG />
            <SignContent>
                <Glass>
                    <SignerInsance>
                        <SignFields />
                        <p>Don't have an account? <a href="/signup" target="_blank">Create Account</a></p>
                        <img 
                            src={ theme === ThemeEnum.LIGHT ? light_logo: dark_logo }
                            alt="VV Logo" 
                        />
                    </SignerInsance>
                </Glass>
            </SignContent>
        </SignWrapper>
    )

}