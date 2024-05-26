import PropTypes from 'prop-types';


const Column = ({ column }) => {
    return (
        <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
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