import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Header from './components/header';
import Footer from './components/footer';
import Content from './components/content';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/read" element={<h1>Read Component</h1>} />
        <Route path="/create" element={<h1>Create Component</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;