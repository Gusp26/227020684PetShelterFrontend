import { Layout, Space} from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import About from './components/About';
import DetailCat from './components/DetailCat';
import NewCat from './components/NewCat';
import UpdateCat from './components/UpdateCat';
import Cat2 from './components/Cats2';
import DeleteCat from './components/DeleteCat';
import Filter from './components/FilterCat';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';

const { Header, Content, Footer } = Layout;

export default function App() {
  return (
    <Router>
      <Header>
        <nav>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/Filter">Filter</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/about">About</Link>
            <Link to="/Login">Login</Link>
            <Link to="/Logout">Logout</Link>
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
          <Route path="/Cat2" element={<Cat2 />}  />
          <Route path="/b/:bid" element = {<UpdateCat /> } />
          <Route path="/c/:cid" element = {<DeleteCat /> } />
          <Route path="/Filter" element = {<Filter /> } />
          <Route path="/Login" element = {<Login /> } />
          <Route path="/Register" element = {<Register /> } />
          <Route path="/Logout" element = {<Logout /> } />
        </Routes>
      </Content>
      <Footer>
        <p>Pet Shelter</p>
      </Footer>
    </Router>
  )
}