import PropTypes from 'prop-types';

export const Filter = ({filterOption, onChange}) => {
  return (      
    <select value={filterOption} onChange={onChange}>
    <option value="all">All</option>
    <option value="follow">Follow</option>
    <option value="following">Following</option>
  </select>
  );
};


Filter.propTypes = {
  filterOption: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};