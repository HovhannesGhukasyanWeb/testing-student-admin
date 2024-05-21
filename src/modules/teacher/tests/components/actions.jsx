import PropTypes from 'prop-types'
import DeleteModal from '../../../../components/modals/deleteModal'
import params from '../utils/params'
import FormModal from '../../../../components/modals/formModal'
import Form from './form'

const Actions = ({ test }) => {
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
        </div>
    )
}

Actions.propTypes = {
    test: PropTypes.object.isRequired
}

export default Actions;