
import PropTypes from 'prop-types';

const Button = ({
    children,
    onClick,
    disabled,
    type = 'button',
    variant = 'primary',
    className = '',
}) => {
    const buttonClasses = `button ${variant} ${className}`;

    return (
        <button className={buttonClasses} type={type} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'submit', 'reset', undefined]),
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'light', 'dark', 'link', 'warning']),
    className: PropTypes.string,
}

export default Button;