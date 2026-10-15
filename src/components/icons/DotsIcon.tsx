import DotsImage from "../../images/Dots.png";

interface IconProps {
  className: string;
}

function DotsIcon({ className }: IconProps) {
  return <img alt="" aria-hidden="true" className={className} src={DotsImage} />;
}

export default DotsIcon;