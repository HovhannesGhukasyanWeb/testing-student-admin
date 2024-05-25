import PropTypes from 'prop-types'
import DeleteModal from '../../../../components/modals/deleteModal'
import params from '../utils/params'
import FormModal from '../../../../components/modals/formModal'
import Form from './form'
import Button from '../../../../ui/button'
import { useNavigate } from 'react-router-dom'

const Actions = ({ test }) => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center gap-2">
            <DeleteModal
                endpoint='/teacher/tests'
                id={test.id}
                message='Do you want to delete this test?'
                params={params}
            />
            <FormModal
                buttonText={'Edit'}
                component={() => <Form test={test} />}
                edit={true}
            />
            <Button
                onClick={() => navigate('/teacher/tests/' + test.id + "/questions")}
            >
                See questions
            </Button>
        </div>
    )
}

Actions.propTypes = {
    test: PropTypes.object.isRequired
}

export default Actions;