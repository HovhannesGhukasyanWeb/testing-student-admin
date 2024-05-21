import PropTypes from 'prop-types'
import DeleteModal from '../../../../components/modals/deleteModal'
import params from '../utils/params'

const Actions = ({ test }) => {
    console.log(test)
    return (
        <div className="flex items-center gap-2">
            <DeleteModal
                endpoint='/teacher/tests'
                id={test.id}
                message='Do you want to delete this test?'
                params={params}
            />
        </div>
    )
}

Actions.propTypes = {
    test: PropTypes.object.isRequired
}

export default Actions;