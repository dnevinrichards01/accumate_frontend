import { useState } from 'react'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import "../styles/Form.css"

function EmailForm({route}) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false)

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    const parseErrorMessage = (errorResponseData) => {
        let success = "";
        let error = "";
        if (errorResponseData==='email') {
            error = "Please enter a valid email address.";
            success = "";
        } else if (errorResponseData==='duplicate') {
            error = "";
            success = "You're already on the waitlist.";
        }
        setError(error);
        setSuccess(success);
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault()

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            setSuccess("")
            setLoading(false);
            return;
        }

        try { 
            const response = await api.post(route, {email})
            setError("")
            setSuccess("Congratulations! You're on the waitlist!");
        } catch (error) {
            if (error.response && error.response.hasOwnProperty('data')) {
                parseErrorMessage(error.response['data'])
            } else {
                setError("We encountered an error. Please try again later.");
                setSuccess("");
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div>
                <div className='form-input-label'>Email:</div>
                <input 
                    className="form-input"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
            </div>
            {error || success ? 
                (error && <div className='form-input-error'>{error}</div>) ||
                (success && <div>{success}</div>)
            : <br/>}
            <button className="form-button" type="submit" >
                Join Waitlist
            </button>
        </form>
    )
    
}

export default EmailForm