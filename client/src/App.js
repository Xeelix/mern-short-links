import React from "react";
import { BrowserRouter as Router } from "react-router-dom"
import { useRoutes } from './routes'
import { CircularProgress, Container, makeStyles } from "@material-ui/core"
import { ToastContainer } from 'react-toastify';
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";


function App() {
    const { token, login, logout, userId, ready } = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if (!ready) {
        return <CircularProgress />
    }

    return (
        <AuthContext.Provider
            value={{
                token, login, logout, userId, isAuthenticated
            }}>
            <Router>

                {/* {isAuthenticated && <Layout />} */}
                <Layout isAuthenticated={isAuthenticated}>
                    <Container>
                        {routes}
                    </Container>
                </Layout>

                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Router>
        </AuthContext.Provider>
    )
}

export default App;
