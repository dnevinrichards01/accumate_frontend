import PasswordResetForm from "../components/PasswordResetForm"
import { useParams } from 'react-router-dom';
import "../styles/HomePreLaunch.css"

function ResetPassword() {
    const { resetToken } = useParams()
    return <PasswordResetForm route={`/api/user/resetpassword/${resetToken}/`}/>
}

export default ResetPassword