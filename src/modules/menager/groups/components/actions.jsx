import PropTypes from 'prop-types';
import DeleteModal from '../../../../components/modals/deleteModal';
import FormModal from '../../../../components/modals/formModal';
import Form from './form';
import { endpoint, params } from '../utils';

const Actions = ({ group }) => {

    const FormComponent = () => <Form group={group} />;

    return (
        <div className="p-2 flex items-center gap-2">
            <DeleteModal id={group.id} message={`You are removing teacher ${group.username}. This action is unrevertable.`} endpoint={endpoint} params={params} />
            <FormModal
                component={FormComponent}
                edit={true}
            />
        </div>
    );
}

Actions.propTypes = {
    student: PropTypes.object.isRequired,
}

export default Actions