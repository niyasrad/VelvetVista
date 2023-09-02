import { useState } from "react";
import { SignContent, SignFieldInstance, SignFieldSubmit, SignFieldsWrapper, SignWrapper, SignerInsance } from "./user.styles";
import Glass from "../../components/glass/Glass";
import SignBG from "../../components/signbg/SignBG";
import { ThemeEnum, useThemeContext } from "../../contexts/Theme.context";

import dark_logo from '../../assets/logo/logo-dark.svg'
import light_logo from '../../assets/logo/logo-light.svg'
import { useNavigate } from "react-router";

function SignFields() {

    const [handle, setHandle] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const navigate = useNavigate()

    const handleSubmit: () => void = () => {
        if (!handle || !email || !password) {
            
        }
        navigate('/')
    }

    return (
        <SignFieldsWrapper>
            <SignFieldInstance 
                value={handle}
                onChange={ (e) => setHandle(e.target.value) }
                placeholder="Username"
                type="text"
            />
            <SignFieldInstance 
                value={email}
                onChange={ (e) => setEmail(e.target.value) }
                placeholder="E-mail"
                type="text"
            />
            <SignFieldInstance 
                value={password}
                onChange={ (e) => setPassword(e.target.value) }
                placeholder="Password"
                type="password"
            />
            <SignFieldSubmit onClick={handleSubmit} >SIGN UP</SignFieldSubmit>
        </SignFieldsWrapper>
    )
    
}

export default function SignUp() {

    const { theme } = useThemeContext()
    
    return (
        <SignWrapper>
            <SignBG />
            <SignContent>
                <Glass>
                    <SignerInsance>
                        <SignFields />
                        <p>Already own an account? <a href="/signin" target="_blank">Sign In</a></p>
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