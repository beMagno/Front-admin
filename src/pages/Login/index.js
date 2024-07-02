import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aqui você faria a lógica de autenticação
    if (username === 'admin' && password === 'admin') {
      onLogin(true); // Chamada da função de sucesso de login
    } else {
      alert('Usuário ou senha incorretos');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20vh' }}>
      <h2>Admin Login</h2>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '10px', padding: '8px' }}
      />
      <button onClick={handleLogin} style={{ padding: '10px 20px', cursor: 'pointer' }}>Login</button>
    </div>
  );
};

export default Login;
