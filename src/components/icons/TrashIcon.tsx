import TrashImage from "../../images/Trash.png";

interface IconProps {
  className: string;
}

function TrashIcon({ className }: IconProps) {
  return <img alt="" aria-hidden="true" className={className} src={TrashImage} />;
}

export default TrashIcon;