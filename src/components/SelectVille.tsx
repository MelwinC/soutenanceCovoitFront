import { Ville } from "@/types/ville";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SelectVille = ({
  onValueChange,
  villes,
  placeholder,
  className,
}: {
  onValueChange: (value: string) => void;
  villes: Ville[];
  placeholder: string;
  className?: string;
}) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger
        className={
          className
            ? className
            : "text-md text-neutral-600 py-6 px-4 w-full mb-4 md:mb-0"
        }
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Villes</SelectLabel>
          <SelectItem value={"0"} className="hover:cursor-pointer">
            {placeholder}
          </SelectItem>
          {villes?.map((ville: Ville) => (
            <SelectItem
              key={ville.id}
              value={ville.id.toString()}
              className="hover:cursor-pointer"
            >
              {ville.ville + " " + ville.cp}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectVille;
