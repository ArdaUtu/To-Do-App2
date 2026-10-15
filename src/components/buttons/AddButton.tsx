import PlusIcon from "../icons/PlusIcon";

interface AddButtonProps {
  className: string;
}

function AddButton({ className }: AddButtonProps) {
  return (
    <button className={className} type="submit">
      <PlusIcon className="size-8 object-contain" />
      Add
    </button>
  );
}

export default AddButton;