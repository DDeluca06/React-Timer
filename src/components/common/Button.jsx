import { useTheme } from '../../context/ThemeContext';

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
    const { theme } = useTheme();

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

    // Get dynamic styles based on theme
    const getVariantStyle = (variant) => {
        const styles = {
            primary: {
                backgroundColor: theme.primary,
                color: '#ffffff',
            },
            secondary: {
                backgroundColor: theme.secondary,
                color: '#ffffff',
            },
            danger: {
                backgroundColor: theme.accent,
                color: '#ffffff',
            },
        };
        return styles[variant] || styles.primary;
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

    const variantStyle = getVariantStyle(variant);

    return (
        <button
            className={`${baseStyles} ${sizeStyles[size]} ${className} hover:opacity-90 hover:-translate-y-0.5`}
            disabled={disabled}
            onClick={handleClick}
            style={{
                ...variantStyle,
                opacity: disabled ? 0.6 : 1,
            }}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;