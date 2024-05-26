import PropTypes from "prop-types";


const Actions = ({ testStudent }) => {
    console.log(testStudent)
    return (
        <div className="flex items-center gap-2"></div>
    )
}

Actions.propTypes = {
    testStudent: PropTypes.object.isRequired
}

export default Actions;