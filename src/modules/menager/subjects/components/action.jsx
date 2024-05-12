import PropTypes from 'prop-types';
import Delete from './delete'
import Edit from './edit'

const Actions = ({ subject }) => {
    return (
        <div className="p-2 flex items-center gap-2">
            <Delete subject={subject} />
            <Edit subject={subject} />
        </div>
    )
}

Actions.propTypes = {
    subject: PropTypes.object.isRequired,
}

export default Actions;