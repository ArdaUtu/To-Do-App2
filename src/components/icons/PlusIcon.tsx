import PlusImage from "../../images/Plus.png";

interface IconProps {
  className: string;
}

function PlusIcon({ className }: IconProps) {
  return <img alt="" aria-hidden="true" className={className} src={PlusImage} />;
}

export default PlusIcon;