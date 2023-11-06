import './loginPage.css'
import { BiLogIn } from 'react-icons/bi'
import { useAuth0 } from '@auth0/auth0-react';

export const LoginPage = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <section>
            <div className='login'>
                <h1 className='login-title'>Movies<span className='login-title-span'>H</span>ub</h1>
                <button onClick={() => loginWithRedirect()} className='login-div'>
                    <h2 className='login-h2'>Log In</h2>
                    <BiLogIn className='login-icon' />
                </button>
            </div>
        </section>
    );
};
