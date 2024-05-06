import PropTypes from 'prop-types';

const Label = ({
    htmlFor = "",
    children,
    required = false,
}) => {
    return (
        <label htmlFor={htmlFor} className='flex items-center text-sm font-medium text-gray-700 mb-1 gap-1'>
            {children}
            {required && <span className='text-red-500'>*</span>}
        </label>
    )
}

Label.propTypes = {
    htmlFor: PropTypes.string,
    children: PropTypes.node,
    required: PropTypes.bool,
};

export default Label;