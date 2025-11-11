export default function FormInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
  minLength,
  helperText
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          id={id}
          type={type}
          required={required}
          minLength={minLength}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all outline-none"
          value={value}
          onChange={onChange}
        />
      </div>
      {helperText && (
        <p className="text-xs text-gray-500 mt-2 ml-1">{helperText}</p>
      )}
    </div>
  )
}
