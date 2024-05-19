import PropTypes from 'prop-types';
import DeleteModal from '../../../../components/modals/deleteModal';
import FormModal from '../../../../components/modals/formModal';
import Form from './form';
import { endpoint, params } from '../utils';
import TeacherSubjectsForm from './teacherSubjectsForm';

const Actions = ({ group }) => {

    const FormComponent = () => <Form group={group} />;
    const TeacherSubjectsFormComponent = () => <TeacherSubjectsForm group={group} />;

    return (
        <div className="p-2 flex items-center gap-2">
            <DeleteModal id={group.id} message={`You are removing teacher ${group.username}. This action is unrevertable.`} endpoint={endpoint} params={params} />
            <FormModal
                component={FormComponent}
                edit={true}
            />
            <FormModal
                component={TeacherSubjectsFormComponent}
                title='teacher subjects'
                buttonText='teacher subjects'
                edit={true}
            />
        </div>
    );
}

Actions.propTypes = {
    group: PropTypes.object.isRequired,
}

export default Actions