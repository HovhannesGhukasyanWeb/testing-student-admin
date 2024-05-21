import PropTypes from 'prop-types';
import DeleteModal from '../../../../components/modals/deleteModal';
import FormModal from '../../../../components/modals/formModal';
import Form from './form';
import { endpoint, params } from '../utils';
import TeacherSubjectsForm from './teacherSubjectsForm';
import Button from '../../../../ui/button';

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
                title='Teacher Subjects'
                buttonText='teacher subjects'
                edit={true}
            />
            <a href={`/manager/groups/${group.id}/students`}>
                <Button>Show</Button>
            </a>
        </div>
    );
}

Actions.propTypes = {
    group: PropTypes.object.isRequired,
}

export default Actions