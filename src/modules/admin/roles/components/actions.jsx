import DeleteModal from "../../../../components/modals/deleteModal";
import FormModal from "../../../../components/modals/formModal";
import params from "../utils/params";
import Form from "./form";
import PropTypes from 'prop-types';

const Actions = ({ role }) => {
    const FormComponent = () => <Form role={role} />;

    return (
        <div className="flex items-center gap-2">
            <DeleteModal
                id={role.id}
                message={`You are removing role ${role.name}. This action is unrevertable.`}
                endpoint={'/admin/roles'}
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
    role: PropTypes.object.isRequired,
}

export default Actions;