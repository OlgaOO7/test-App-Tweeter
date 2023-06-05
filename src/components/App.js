import { lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

const Home = lazy (() => import('../pages/Home/Home.js'));
const Tweets = lazy (() => import('../pages/Tweets/Tweets.js'));

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tweets" element={<Tweets />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
    </>


    // <div className="App">
    //   <UsersList />

    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
