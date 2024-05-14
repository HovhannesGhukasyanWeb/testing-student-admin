const Actions = ({ teacher }) => {
    return (
        <div className="p-2 flex items-center gap-2">
            {/* <Delete subject={subject} />
            <Edit subject={subject} /> */}
        </div>
    );
}

Actions.propTypes = {
    teacher: PropTypes.object.isRequired,
}

export default Actions