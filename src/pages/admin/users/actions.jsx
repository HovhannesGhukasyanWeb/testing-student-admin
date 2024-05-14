import PropTypes from 'prop-types';
import Delete from './delete'
import Edit from './edit'

const Actions = ({ user }) => {
    return (
        <div className="p-2 flex items-center gap-2">
            <Delete user={user} />
            <Edit user={user} />
        </div>
    )
}

Actions.propTypes = {
    user: PropTypes.object.isRequired,
}

export default Actions;