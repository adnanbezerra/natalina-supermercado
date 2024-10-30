import "./index.css";

interface InputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
}

export default function Input({ value, onChange, label }: InputProps) {
    return (
        <div className='flex'>
            <label>{label}</label>
            <input value={value} onChange={onChange} />
        </div>
    );
}
