import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isloading } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    navigate('/user/login')
  }

  return (
    <section className="container">
    <header className='header'>
      <div className='logo'>
        <Link to='/'>
          <h1>Pensieve</h1>
        </Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to='/user/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/user/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
    </section>
  )
}

export default Header