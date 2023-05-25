import { Layout, Space} from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import About from './components/About';
import DetailCat from './components/DetailCat';
import NewCat from './components/NewCat';

const { Header, Content, Footer } = Layout;

export default function App() {
  return (
    <Router>
      <Header>
        <nav>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/about">About</Link>
            <Link to="/NewCat">NewCat</Link>
          </Space>
        </nav>
      </Header>
      <Content>
        <Routes>
          <Route index element={ <Home /> } />
          <Route path="/dashboard" element={<Dashboard />}  />  
          <Route path="/about" element={<About />}  />
          <Route path="/a/:aid" element = {<DetailCat /> } />
          <Route path="/NewCat" element={<NewCat />}  />
        </Routes>
      </Content>
      <Footer>
        <p>Pet Shelter</p>
      </Footer>
    </Router>
  )
}