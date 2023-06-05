import { lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";

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
  );
}

export default App;
