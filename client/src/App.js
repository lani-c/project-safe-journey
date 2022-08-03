import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import countryData from "./data/countries-data.json";
import countries from "./data/countries-data.json";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About"
import Login from "./components/Users/Login";
import Logout from "./components/Users/Logout";
import Register from "./components/Users/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Form from "./components/Form";
import CountryReviews from "./components/CountryReviews";
import CountryReviewDetail from "./components/CountryReviewDetail"
import Countries from "./components/Countries";
import Services from "./components/Services";

import Africa from "./components/Continents/Africa"
import Asia from "./components/Continents/Asia"
import Europe from "./components/Continents/Europe"
import NAmerica from "./components/Continents/North-America"
import Oceania from "./components/Continents/Oceania"
import SAmerica from "./components/Continents/South-America"

const App = () => {
  const [authorised, setAuthorised] = useState(null);
  const navigate = useNavigate();
  fetch(`${process.env.REACT_APP_API_ENDPOINT}/reviews`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });

  const handleAuth = (authed) => {
    setAuthorised(authed);
    navigate("/");
  };

  const handleLogout = () => {
    setAuthorised(null);
    navigate("/");
  };

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/users/isauthorised`
      );
      const data = await res.json();
      console.log(data.msg);
      setAuthorised(data.authorised);
    };
    checkIfLoggedIn();
  }, []);

  const [reviews, setReviews] = useState(null)

  const getReviews = async () => {
    const url = 'http://localhost:4000/reviews'
    const res = await fetch(url)
    const data = await res.json()
    setReviews(data)
  }

  useEffect(() => {
    getReviews()
  }, [])

  const handleCreate = (name) => {
    console.log('App.js create review with name:', name)
  }

  const handleDelete = async (reviewID) => {
    await fetch(`http://localhost:4000/countries/${reviewID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setReviews(reviews.filter((rv) => rv._id !== reviewID))
  }

  return (
    <div className="App">
      <NavBar authorised={authorised} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/countries" element={<Countries data={countryData} />} />
        <Route path="/support" element={<Services />} />
        <Route path="/reviews/new" element={
          <ProtectedRoute authorised={authorised}>
            <Form countries={countries} />
          </ProtectedRoute>
        } />
        <Route
          path="/"
          element={reviews && <CountryReviews
            reviews={reviews}
            handleCreate={handleCreate}
            handleDelete={handleDelete}
          />}
        />
        <Route path="/:reviewID" element={reviews && <CountryReviewDetail reviews={reviews} />} />
        <Route
          path="/register"
          element={<Register handleRegister={handleAuth} />}
        />
        <Route path="/login" element={<Login handleLogin={handleAuth} />} />
        <Route path="logout" element={<Logout handleLogout={handleLogout} />} />
        
        <Route path="/Africa" element={<Africa />} />
        <Route path="/Asia" element={<Asia />} />
        <Route path="/Europe" element={<Europe />} />
        <Route path="/North-America" element={<NAmerica />} />
        <Route path="/Oceania" element={<Oceania />} />
        <Route path="/South-America" element={<SAmerica />} />

      </Routes>
    </div>
  );
};

export default App;
