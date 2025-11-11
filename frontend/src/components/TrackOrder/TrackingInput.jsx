export default function TrackingInput({ label, type, value, onChange, placeholder, helperText, required = false }) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
        placeholder={placeholder}
      />
      {helperText && (
        <p className="text-sm text-gray-500 mt-2">{helperText}</p>
      )}
    </div>
  )
}
