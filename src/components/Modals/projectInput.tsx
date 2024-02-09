import { Input } from "@material-tailwind/react";

const ProjectInput = ({
  label,
  type,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) => (
  <Input
    crossOrigin=""
    type={type}
    variant="standard"
    label={label}
    value={value}
    onChange={onChange}
    disabled={disabled}
  />
);

export default ProjectInput;
