import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../redux/actions/userActions';

export default function Navbar() {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.userSignin);
    const signoutHandler = () => {
        dispatch(signout());
    }

    return (
        <nav className="navbar">
            <div className="left">
    
                <div className="toggle-button">
                    <div className="toggle-button-create">
                        <Link to="#" className="toggle-button-create">
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </Link>
                    </div>
                </div>

                <div className="brand-title">
                    <Link className="logo-link" to="/">
                        <h3 className="logo1">
                            <span className="logo2">COURSE</span><span className="logo3">MAJOR</span>
                            <i className="icon-fighter-jet"></i>
                        </h3>
                    </Link>
                </div>
            
            </div>

        { userInfo ? (
                <div className="right">
                    { userInfo ? (
                        <div className="menu-button">
                            <Link className="menu-link" to="/CreateYourCourse">
                                <p className="menu-paragraph">I HAVE A COURSE</p>
                            </Link>
                        </div>
                    ) : (
                        <div></div>
                    )};
                    
                    <div><i className="fa fa-shopping-cart" aria-hidden="true"></i></div>
                        <div className="dropdown">
                            {/*---Profile---*/}
                            <div className="profile-logo">
                                <div>{userInfo.username.charAt(0).toUpperCase()}</div>
                            </div> 
                            <div className="dropdown-content">
                                <Link to="/mycourses">MyCourses</Link>
                                <Link to="/coursessold">CourseSold</Link>
                                <Link to="/editprofile">Profile</Link>
                                {userInfo ? (
                                    <div>
                                        <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                                    </div>
                                    ) : (
                                    <div></div>
                                )}
                    
                            </div>
                        </div>
                    </div>
            ) : (
                <div className="right">
                    <div class="menu-button">
                        <Link class="menu-link" to="/login">
                            <p class="menu-paragraph">SIGN IN</p>
                        </Link>
                    </div>
                </div>
            )}

            <div className="middle">
                <input className="input-class" placeholder="Find you course" />
                <button className="search-button"><i className="fas fa-search"></i></button>
            </div>
        </nav>
	

      
    );
}