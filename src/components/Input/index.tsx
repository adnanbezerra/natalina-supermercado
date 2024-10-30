import "./index.css";

interface InputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    placeholder?: string;
    type?: string;
    className?: string;
}

export default function Input({
    value,
    onChange,
    label,
    placeholder,
    type,
    className,
}: InputProps) {
    return (
        <div className="flex">
            <label>{label}</label>
            <input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                className={className}
            />
        </div>
    );
}
