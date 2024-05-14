import PropTypes from 'prop-types';
import Edit from './edit'
import DeleteModal from '../../../../components/modals/deleteModal';

const Actions = ({ subject }) => {
    return (
        <div className="p-2 flex items-center gap-2">
            <DeleteModal id={subject.id} message={`You are removing subject ${subject.name}. This action is unrevertable.`} endpoint={'/manager/subjects'} params={{}}/>
            <Edit subject={subject} />
        </div>
    )
}

Actions.propTypes = {
    subject: PropTypes.object.isRequired,
}

export default Actions;