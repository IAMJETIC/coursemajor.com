import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from "./screens/Home";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import PurchaseHistory from "./screens/PurchaseHistory";
import AdminUserEdit from "./screens/AdminUserEdit";
import Test from "./screens/Test";

import CoursePreview from "./screens/CoursePreview";
import Course from "./screens/Course";
import CreateCourseFunnel from "./screens/CreateCourseFunnel";
import CreateCourse from "./screens/CreateCourse";
import CourseStatistics from "./screens/CourseStatistics";
import CourseSold from "./screens/CourseSold";
import MyCourses from "./screens/MyCourses";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Search from "./components/Search";

// Routing
import PrivateRoute from "./routing/PrivateRoute";
import SellerRoute from "./routing/SellerRoute";
import AdminRoute from "./routing/AdminRoute";

//Auth Screens
import PrivateScreen from "./screens/PrivateScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";

//Profile
import EditProfile from "./screens/profile/EditProfile";
import CloseAccount from './screens/profile/CloseAccount';
import Notifications from './screens/profile/Notifications';
import PayPal from './screens/profile/PayPal';
import SocialProfile from './screens/profile/SocialProfile';
import UserProfile from './screens/profile/UserProfile';

//Blog
import CreatePost from "./screens/CreatePost";

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/closeaccount" component={CloseAccount} />
        <PrivateRoute path="/paypal" component={PayPal} />
        <PrivateRoute path="/socialprofile" component={SocialProfile} />
        <PrivateRoute path="/userprofile" component={UserProfile} />


        <div>
          <header className="header-container">
            <Navbar />
          </header>

          <AdminRoute path="/createpost" component={CreatePost} />

          <Route exact path="/privateroute" component={PrivateScreen} />

          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
          <Route exact path="/passwordreset/:resetToken" component={ResetPasswordScreen} />

          <Route path="/" exact component={Home} />
          <Route path="/home" component={Home} />

          <Route path="/signup2" component={Signup} />
          <Route path="/login2" component={Login} />
          <Route path="/signin2" component={Login} />
          <Route path="/search" component={Search} />
          <AdminRoute path="/AdminUserEdit" component={AdminUserEdit} />
          <PrivateRoute path="/PurchaseHistory" component={PurchaseHistory} />
          <Route path="/Test" component={Test} />

          <Route path="/CreateYourCourse" component={CreateCourseFunnel} />
          <PrivateRoute path="/CreateCourse" component={CreateCourse} />
          <PrivateRoute path="/course/:id" component={Course} />
          <Route path="/MyCourses" component={MyCourses} />
          <Route path="/coursepreview/:id" component={CoursePreview} />
          <Route path="/coursestatistics" component={CourseStatistics} />
          <SellerRoute path="/coursesSold" component={CourseSold} />
          <Footer />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
