import PropTypes from "prop-types";
import DeleteModal from "../../../../components/modals/deleteModal";


const Actions = ({ testStudent }) => {
    console.log(testStudent)
    return (
        <div className="flex items-center gap-2">
            <DeleteModal
            // endpoint=""
            />
        </div>
    )
}

Actions.propTypes = {
    testStudent: PropTypes.object.isRequired
}

export default Actions;