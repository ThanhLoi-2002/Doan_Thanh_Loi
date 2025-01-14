import { FC } from "react";

interface Props {
  loading?: boolean;
  title: string
}
const Button: FC<Props> = ({ loading = false, title }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none flex items-center justify-center`}
    >
      {loading && (
        <div className="animate-spin border-4 border-t-4 border-white border-t-transparent rounded-full w-4 h-4 mr-2"></div>
      )}
      {loading ? "Loading..." : title}
    </button>
  );
};

export default Button;
