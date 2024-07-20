import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import { AdminRouter, UserRouter } from "./routers";
import "./App.css";
import UserLayout from "./components/UserLayout/UserLayout";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {AdminRouter.map((route, index) => {
            let Layout = AdminLayout;
            let Page = route.component;
            if (index > 3) {
              return (
                <Route
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            } else {
              return <Route path={route.path} element={<Page />} />;
            }
          })}
          {UserRouter.map((route, index) => {
            let Layout = UserLayout;
            let Page = route.component;
            if (index >= 21) {
              return <Route path={route.path} element={<Page />} />;
            } else {
              return (
                <Route
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            }
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
