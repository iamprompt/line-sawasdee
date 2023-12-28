import { FieldError, Input, Label, TextField } from 'react-aria-components'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>
  label: string
  name: Path<T>
}

const FormField = <T extends FieldValues>({
  control,
  label,
  name,
}: FormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { name, value, onChange, onBlur, ref },
        fieldState: { invalid, error },
      }) => (
        <TextField
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          isRequired
          validationBehavior="aria"
          isInvalid={invalid}
          className="flex flex-col gap-2"
        >
          <Label className="w-32 font-bold">{label}</Label>
          <div className="flex flex-col">
            <Input ref={ref} className="rounded-lg border py-2 px-4" />
            <FieldError className="text-sm mt-2 text-red-600">
              {error?.message}
            </FieldError>
          </div>
        </TextField>
      )}
    />
  )
}

export default FormField
