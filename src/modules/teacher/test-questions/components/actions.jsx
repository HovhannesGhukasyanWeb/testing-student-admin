import PropTypes from "prop-types";
import DeleteModal from "../../../../components/modals/deleteModal";
import params from "../utils/params";
import { useParams } from "react-router-dom";

const Actions = ({ testQuestion }) => {
    const { id: testId } = useParams();
    return (
        <div>
            <DeleteModal
                endpoint="teacher/test/questions"
                id={testQuestion.id}
                message="Are you sure you want to remove this test question?"
                params={params}
                fetchEndpoint={'teacher/tests/' + testId}
            />
        </div>
    )
}

Actions.propTypes = {
    testQuestion: PropTypes.object.isRequired
}

export default Actions;