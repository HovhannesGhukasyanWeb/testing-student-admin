import PropTypes from 'prop-types';

const Label = ({
    htmlFor = "",
    children,
}) => {
    return (
        <label htmlFor={htmlFor} className='block text-sm font-medium text-gray-700 mb-1'>
            {children}
        </label>
    )
}

Label.propTypes = {
    htmlFor: PropTypes.string,
    children: PropTypes.node,
};

export default Label;