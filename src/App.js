import React from 'react';
import AuthorPage from './components/AuthorPage';
import PaperPage from './components/PaperPage.js';
import HomePage from './components/HomePage';
import ReadingListPage from './components/ReadingListPage';

//impurt outlet next to link if website has subroutes within aka links within links
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';


/*
* Creates the links between the webpages by using Browser router, route and link
*/
function App() {
  return (
    <BrowserRouter basename={"/kf6012/coursework/part2"}>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="paperPage">Papers</Link></li>
            <li><Link to="authorPage">Authors</Link></li>
            <li><Link to="readinglist">Reading List</Link></li>           
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<p>Page Not Found</p>} />
          <Route path="paperPage" element={<PaperPage />} />
          <Route path="authorPage" element={<AuthorPage />} />
          <Route path="readinglist" element={<ReadingListPage />} />
        </Routes>

        <div className="footer">
          <p>Bob Auchterlounie · W18013532 · This webpage is Northumbria University coursework</p>
        </div>
        
      </div>
    </BrowserRouter>
  );
}

export default App;