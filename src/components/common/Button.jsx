import PropTypes from 'prop-types';

// Defining our Button component and determining variance, size, etc. 
const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    className = '',
    ...props
}) => {
    // Base styles for our button
    const baseStyles = 'rounded-lg transition-colors duration-300 ease-in-out';

    // Variant styles for our button, this makes it easier to change the look of the button depending on what function we need it to servef from a UI perspective.
    const variantStyles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    };
    
    // Define button size styles to make them adaptable
    const sizeStyles = {
        size: 'px-3 py-1 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
    };

    // Return the button component styles depending on the variant and size we get back from props
    return(
        <button
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
    size: PropTypes.oneOf(['size', 'medium', 'large']),
    className: PropTypes.string,
};

// Defaults
Button.defaultProps = {
    variant: 'primary',
    size: 'medium',
    className: '',
};

export default Button;