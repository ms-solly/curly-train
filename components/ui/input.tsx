export function Input({ type = "text", placeholder, value, onChange }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
    );
  }
  