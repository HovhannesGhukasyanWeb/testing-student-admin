import PropTypes from "prop-types";
import DeleteModal from "../../../../components/modals/deleteModal";
import params from "../utils/params";


const Actions = ({ testStudent }) => {
    return (
        <div className="flex items-center gap-2">
            <DeleteModal
                endpoint="/teacher/test_user"
                id={testStudent.id}
                message="Are you sure you want to delete this test student?"
                fetchEndpoint={`/teacher/tests/${testStudent.test_id}`}
                params={params}
            />
        </div>
    )
}

Actions.propTypes = {
    testStudent: PropTypes.object.isRequired
}

export default Actions;