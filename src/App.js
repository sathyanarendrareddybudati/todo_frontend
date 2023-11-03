import './App.css';
import SignupForm from './signup';
import LoginForm from './signin'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Header from './header';
import PostItems from './todo_post';
import ItemList from './todo_get';
import DeleteItem from './todo_delete';
import UpdateItem from './todo_update';

function App() {
  return (
    <Router>
      <div className="App">
      <Header />
        <Routes> 
          <Route path="/login" element={<LoginForm />} /> 
          <Route path="/" element={<SignupForm />} /> 
          <Route path="/post" element={<PostItems />} />
          <Route path="/get" element={<ItemList />} />
          <Route path="/delete" element={<DeleteItem />} />
          <Route path="/update" element={<UpdateItem />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
