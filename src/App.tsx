import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Announcements from './pages/Announcements';
import Sidebar from './components/Sidebar';
import styled from 'styled-components';
import FAQ from './pages/Faq';
import MyRh from './pages/MyRh';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Topbar from './components/Topbar';
import Notifications from './pages/Notification';

const AppContainer = styled.div`
  display: flex;
  padding-top: 40px;
  overflow-x: hidden;
`;

const Content = styled.div`
  flex: 1;
  padding: 40px;
  margin-left: 240px; /* Largura da sidebar + um pouco de espaçamento */
  max-width: calc(100% - 240px); /* Para garantir que o conteúdo não ultrapasse a tela */
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Sidebar />
        <Topbar />
        <Content>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/comunicados" element={<Announcements />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/meurh" element={<MyRh />} />
            <Route path="/notificacoes" element={<Notifications />} />
            <Route path="/login" element={<Login />} />
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
