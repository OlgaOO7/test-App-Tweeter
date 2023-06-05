import css from "./Home.module.css";

const Home = () => {
  return (
    <div className={css.titleHomeWrapper}>
      <h1 className={css.homeTitle}>
        Welcome to world of Tweet!
      </h1>
    </div>
  );
};

export default Home;