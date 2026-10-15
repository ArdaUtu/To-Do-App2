import EditImage from "../../images/Edit.png";

interface IconProps {
  className: string;
}

function EditIcon({ className }: IconProps) {
  return <img alt="" aria-hidden="true" className={className} src={EditImage} />;
}

export default EditIcon;