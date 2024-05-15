import PropTypes from 'prop-types';
import Edit from './edit';
import DeleteModal from '../../../../components/modals/deleteModal';
import TeacherSubjects from './teacherSubjects';

const Actions = ({ teacher }) => {
    return (
        <div className="p-2 flex items-center gap-2">
            <DeleteModal id={teacher.id} message={`You are removing teacher ${teacher.username}. This action is unrevertable.`} endpoint={'/manager/teachers'} params={{ include: 'userProfile' }} />
            <Edit teacher={teacher} />
            <TeacherSubjects teacher={teacher} />
        </div>
    );
}

Actions.propTypes = {
    teacher: PropTypes.object.isRequired,
}

export default Actions