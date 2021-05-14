import "./button.css";
import { ButtonProps } from "./Button.interface";

export const Button = ({
  hidden,
  onClick,
  src,
  type,
}: ButtonProps): JSX.Element => {
  return hidden ? (
    <></>
  ) : (
    <div className="btn-tb" onClick={onClick}>
      1
    </div>
  );
};
