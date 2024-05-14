import PropTypes from 'prop-types';
import Edit from './edit'
import DeleteModal from '../../../../components/modals/deleteModal';

const Actions = ({ user }) => {
    return (
        <div className="p-2 flex items-center gap-2">
            <DeleteModal id={user.id} message={`You are removing teacher ${user.username}. This action is unrevertable.`} endpoint={'/admin/users'} params={{ include: 'role&userProfile' }} />
            <Edit user={user} />
        </div>
    )
}

Actions.propTypes = {
    user: PropTypes.object.isRequired,
}

export default Actions;