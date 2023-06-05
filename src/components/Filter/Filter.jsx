import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ filterOption, onChange }) => {
  return (
    <div className={css.filterWrapper}>
      <select value={filterOption} onChange={onChange} className={css.filter}>
        <option value="all" className={css.option}>All</option>
        <option value="follow" className={css.option}>Follow</option>
        <option value="following" className={css.option}>Following</option>
      </select>
    </div>
  );
};

Filter.propTypes = {
  filterOption: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
