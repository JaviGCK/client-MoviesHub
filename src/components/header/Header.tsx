import './header.css'
import { useAuth0 } from '@auth0/auth0-react'
import { BiLogOut } from 'react-icons/bi'

export const Header = () => {
    const { logout, isLoading } = useAuth0()
    if (isLoading) return <div>Loanding... </div>

    return (
        <header>
            <h1 className='header-title'>Movies<span className='header-title-span'>H</span>ub</h1>
            <button className='header-button' onClick={() => logout()}>
                <BiLogOut className='header-icon' />
            </button>
        </header>
    )
}
