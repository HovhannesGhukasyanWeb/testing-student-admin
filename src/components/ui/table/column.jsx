import PropTypes from 'prop-types';


const Column = ({ column }) => {
    return (
        <th className='p-2'>
            <div>
                {column.title}
            </div>
        </th>
    )
}

Column.propTypes = {
    column: PropTypes.object.isRequired,
}

export default Column;