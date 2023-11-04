import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import InputHidden from './InputHidden'
import InputGroup from './InputGroup'

type InputSelectProps = {
  options: { label: string; value: string }[]
  label: string
  name: string
  id: string
  value?: string | number | null
  setValue: (value: any) => void
  required?: boolean
  error?: string
  readonly?: boolean
  disabled?: boolean
}

const InputSelect = ({
  label,
  name,
  value = '',
  setValue,
  required = false,
  error,
  disabled = false,
  options,
}: InputSelectProps) => {
  return (
    <InputGroup label={label} error={error}>
      <Select value={value?.toString()} onValueChange={setValue} required={required} disabled={disabled} name={name}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <InputHidden name={name} id={name} value={value}/>
    </InputGroup>
  )
}

export default InputSelect
