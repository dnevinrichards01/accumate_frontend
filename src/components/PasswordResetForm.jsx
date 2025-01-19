import { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import "../styles/ResetPasswordForm.css"


function PasswordResetForm({route}) {
    const [newPassword, setNewPassword] = useState("")
    const [errorNewPassword, setErrorNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")
    const [errorSubmit, setErrorSubmit] = useState("")

    
    const newPasswordErrorMessage = 'Password must be at least 8 characters long with at least one capital letter and symbol'
    const confirmPasswordErrorMessage = 'Passwords do not match'
    
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    const validateNewPassword = (newPassword) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!\.%*?&])[A-Za-z\d@$!\.%*?&]{8,}$/;
        return passwordRegex.test(newPassword);
    };

    const validateConfirmPassword = (confirmPassword, newPassword) => {
        return confirmPassword === newPassword
    };

    const parseErrorMessage = (errorResponse) => {
        var isSuccess = true
        try {
            if (errorResponse.error === "Passwords do not match") {
                setErrorConfirmPassword(confirmPasswordErrorMessage)
                isSuccess = false
            } else if (errorResponse.error === "Invalid token") {
                setErrorSubmit("Check if url set correctly or request password reset again")
                isSuccess = false
            } else {
                parsedErrorResponse = JSON.parse(errorResponse.error)
                if (parsedErrorResponse.hasOwnProperty('new_password')) {
                    setErrorNewPassword(newPasswordErrorMessage);
                    isSuccess = false
                }
                if (parsedErrorResponse.hasOwnProperty('confirm_password')) {
                    setErrorConfirmPassword(confirmPasswordErrorMessage)
                    isSuccess = false
                } 
            }
        } catch (e) {
            setErrorSubmit("Check if url set correctly or request password reset again")
            isSuccess = false
        }
        return isSuccess
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const isNewPasswordValid = !validateNewPassword(newPassword)
        if (isNewPasswordValid) {
            setErrorNewPassword(newPasswordErrorMessage);
        } else {
            setErrorNewPassword("");
        }
        const isConfirmPasswordValid = !validateConfirmPassword(newPassword, confirmPassword)
        if (isConfirmPasswordValid) {
            setErrorConfirmPassword(confirmPasswordErrorMessage)
            return
        } else {
            setErrorConfirmPassword("")
        }
        
        if (isNewPasswordValid || isConfirmPasswordValid) {
            return
        }

        try { 
            const payload = {
                "new_password": newPassword,
                "confirm_password": confirmPassword
            }
            const response = await api.post(route, payload)
            setErrorConfirmPassword("")
            setErrorNewPassword("")
            setErrorSubmit("")
            navigate("/resetpasswordsuccess/")
        } catch (error) {
            console.log(error)
            parseErrorMessage(error.response?.data)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Reset Password</h1>
            <div>
                <div className='form-input-label'>New Password:</div>
                <input 
                    className="form-input"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Password"
                />
                <div className='form-input-error'>{errorNewPassword}</div>
            </div>
            
            <div>
                <div className='form-input-label'>Confirm New Password:</div>
                <input 
                    className="form-input"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Password"
                />
                <div className='form-input-error'>{errorConfirmPassword}</div>
            </div>
            <div className="button-div">
                <button className="form-button" type="submit">Submit</button>
                <div className='form-input-error'>{errorSubmit}</div>
            </div>
        </form>
    )
}

export default PasswordResetForm