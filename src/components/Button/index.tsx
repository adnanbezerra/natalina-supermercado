import "./index.css";

type ButtonProps = {
    children: React.ReactNode;
    onClick: (e: any) => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
};

export default function Button({
    children,
    onClick,
    disabled = false,
    type = "button",
    className,
}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`party-golden text-pine-green ${className}`}
        >
            {children}
        </button>
    );
}
