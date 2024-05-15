import PropTypes from 'prop-types';
import DeleteModal from '../../../../components/modals/deleteModal';
import FormModal from '../../../../components/modals/formModal';
import Form from './form';
import params from '../utils/params';

const Actions = ({ user }) => {
    const FormComponent = () => <Form user={user} />;

    return (
        <div className="p-2 flex items-center gap-2">
            <DeleteModal
                id={user.id}
                message={`You are removing teacher ${user.username}. This action is unrevertable.`}
                endpoint={'/admin/users'}
                params={params}
            />
            <FormModal
                component={FormComponent}
                edit={true}
            />
        </div>
    )
}

Actions.propTypes = {
    user: PropTypes.object.isRequired,
}

export default Actions;