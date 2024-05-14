import PropTypes from 'prop-types';

const Input = ({
    type = 'text',
    name = "",
    autoComplete = "",
    className = "",
    errorMessage = "",
    ...rest
}) => {
    const inputClass = `block w-full px-3 py-2 border border-lightgray rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`;

    return (
        <div className='flex flex-col gap-1'>
            <input type={type} name={name} autoComplete={autoComplete} className={inputClass} {...rest} />
            {errorMessage && <span className="text-red-500 text-xs mt-1 ml-1">{errorMessage}</span>}
        </div>
    )
}


Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    autoComplete: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    errorMessage: PropTypes.string
}

export default Input;