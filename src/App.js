import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import BooksList from './component/BooksList';
import Book from './component/Book';
import BookForm from './component/BookForm';
import HeaderComponent from './component/HeaderComponent';



function FooterCompoment() {
  return (
    <footer style={{ marginTop: "100px", marginBottom: "60px", width: "100%" }} >
      <p style={{ textAlign: "center" }}>REST API Demo. Image from Open Library Covers API</p>
    </ footer >
  )
}


function App() {
  return (
    <div className="App">

      <Router>

        <HeaderComponent />

        <Switch>

          <Route path="/books/:id/edit" component={BookForm} />

          <Route path="/books/:id" component={Book} />

          <Route exact path={["/", "/books"]} component={BooksList} />


        </Switch>
      </Router>


      <FooterCompoment />

    </div>
  );
}

export default App;
