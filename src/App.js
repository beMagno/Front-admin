import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Announcements from './pages/Announcements';
import Sidebar from './components/Sidebar';
import styled from 'styled-components';
import FAQ from './pages/Faq';
import MyRh from './pages/MyRh';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Sidebar />
        <Content>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/comunicados" element={<Announcements />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/meurh" element={<MyRh />} />
          </Routes>
        </Content>
      </AppContainer>
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
  );
};

export default App;
