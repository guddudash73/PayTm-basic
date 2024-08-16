import { Link } from "react-router-dom";

export function BottomWarning({ message, buttonText, to }) {
  return (
    <div className="flex justify-center gap-2 py-2 text-sm">
      <div>{message}</div>
      <Link className="underline pointer cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
  );
}
