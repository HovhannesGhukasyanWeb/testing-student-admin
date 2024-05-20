import PropTypes from 'prop-types';
import DeleteModal from '../../../../components/modals/deleteModal';
import params from '../utils/params';
import FormModal from '../../../../components/modals/formModal';
import Form from './form';

const Actions = ({ question }) => {
    const FormComponent = () => (<Form question={question} />)
    return (
        <div className="flex items-center p-2 gap-2">
            <DeleteModal
                id={question.id}
                message={`You are removing question "${question.title}". This action is unrevertable.`}
                endpoint={'/teacher/questions'}
                params={params}
            />
            <FormModal edit={true} component={FormComponent} />
            see
        </div>
    )
}

Actions.propTypes = {
    question: PropTypes.object.isRequired,
}

export default Actions;