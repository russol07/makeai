import React from 'react';
import './App.css';
import PackageSelector from './PackageSelector';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Автоматизація для вашого бізнесу</h1>
        <p>Обирайте комбінацію пакетів та отримуйте додаткові знижки</p>
      </header>
      <main className="App-main">
        <PackageSelector />
      </main>
      <footer className="App-footer">
        <p>© 2024 Automation Hub. Всі права захищені.</p>
      </footer>
    </div>
  );
}

export default App;
