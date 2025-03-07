import PropTypes from 'prop-types';

// Defining our Button component and determining variance, size, etc. 
const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    className = '',
    disabled = false,
    onClick,
    ...props
}) => {
    // Base styles including better feedback animations
    const baseStyles = `
        rounded-lg font-semibold relative
        transition-all duration-200
        transform active:scale-95
        focus:outline-none focus:ring-2 focus:ring-opacity-50
        disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
        disabled:hover:transform-none disabled:active:scale-100
        overflow-hidden
    `;

    // Enhanced variant styles with focus ring colors
    const variantStyles = {
        primary: `
            bg-secondary text-white
            hover:bg-opacity-90 hover:-translate-y-0.5
            active:bg-opacity-100 active:translate-y-0
            focus:ring-secondary
            disabled:bg-opacity-70
        `,
        secondary: `
            bg-light-button dark:bg-dark-button text-light-text dark:text-dark-text
            hover:bg-opacity-90 hover:-translate-y-0.5
            active:bg-opacity-100 active:translate-y-0
            focus:ring-gray-400
            disabled:bg-opacity-70
        `,
        danger: `
            bg-primary text-white
            hover:bg-opacity-90 hover:-translate-y-0.5
            active:bg-opacity-100 active:translate-y-0
            focus:ring-primary
            disabled:bg-opacity-70
        `,
    };
    
    // Enhanced size styles
    const sizeStyles = {
        small: 'px-3 py-1.5 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
    };

    // Add ripple effect on click
    const handleClick = (e) => {
        if (disabled) return;
        
        // Create ripple element
        const ripple = document.createElement('span');
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size/2;
        const y = e.clientY - rect.top - size/2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.className = 'absolute rounded-full bg-white bg-opacity-30 pointer-events-none transform scale-0 animate-ripple';
        
        e.target.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);

        // Call original onClick if it exists
        if (onClick) onClick(e);
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            disabled={disabled}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    );
};

// Prop definitions, these are here to ensure that the props are passed in correctly
// This is a good practice to ensure that the component is used correctly and we drop any unexpected datatypes.
Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

// Defaults
Button.defaultProps = {
    variant: 'primary',
    size: 'medium',
    className: '',
    disabled: false,
};

export default Button;