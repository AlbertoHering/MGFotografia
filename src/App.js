import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import Slider from './components/NetflixSlider'
import axios from "axios"
import './App.scss'

const PortalModal = () => {
  return ReactDOM.createPortal((
      <div>
          Hello from Model
      </div>
  ), document.getElementById('modal-root'))
}

function setToken(key,value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function getToken(key) {
  const ssKey = sessionStorage.getItem(key);
  const jKey = JSON.parse(ssKey);
  return jKey
}

function allmovies() {
  const [isLoading, setLoading] = useState(true);
  const [movies, setItems] = useState();
  useEffect(() => {
      const API_PATH = 'http://local/movies.php';
      axios.get(
          `${API_PATH}`, { crossdomain: true }
          ).then(response => {
              setItems(response.data);
              setLoading(false);
          });
    }, []);

  if (isLoading && !!!movies) {
      return <div className="app loading"><div>Cargando...</div></div>;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/page">Page</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/page" element={<p>Hola Mundo</p>}>
          </Route>
          <Route exact path="/" 
            element={<Slider>
              {movies.map(movie => (
                <Slider.Item movie={movie} key={movie.id}></Slider.Item>
              ))}
            </Slider>}>
          </Route>
        </Routes>
      </BrowserRouter>
        <div className="footer">
            <div>
              <div>Martha Guzmán Fotografía</div>
              <div>2021 Todos los derechos reservados</div>
            </div>
        </div>
    </div>
  );
}

export default allmovies;
