import { RotatingLines } from 'react-loader-spinner';
import css from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={css.loaderWrapper}>
      <RotatingLines
        strokeColor="#EBD8FF"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};
