import { FC } from "react";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import { Provider } from "react-redux";
import Home from "./pages/home";
import store from "./redux/store/index";
import { Route, BrowserRouter as Router } from "react-router-dom";
import JobPosts from "./pages/job-posts/index";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import "notyf/notyf.min.css";
import NewUser from './pages/user/new';

const App: FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        {/* <Layout className="bg-white"> */}
        <div>
          <Route path="/" exact component={Home} />
          <div className="container-fluid  ">
            <Route path="/job-posts" exact component={JobPosts} />
            <Route path="/auth/sign-in" exact component={SignIn} />
            <Route path="/auth/sign-up" exact component={SignUp} />
            <Route path="/user/new" exact component={NewUser} />
          </div>
        </div>
        {/* <Footer /> */}
        {/* </Layout> */}
      </Router>
    </Provider>
  );
};

export default App;
