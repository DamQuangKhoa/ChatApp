import { useHistory } from "react-router-dom";

const Header = ({ title }) => {
  const history = useHistory();
  const leave = () => {
    history.push("/");
    window.location.reload();
  };
  return (
    <div className="fixed top-0 left-0 w-screen text-center p-3 z-50 bg-white">
      {title ? (
        <div className="d-flex justify-center items-center">
          <button className="absolute left-4 text-green-500" onClick={leave}>
            Exit
          </button>
          <h2 className="font-semibold text-3xl">{title}</h2>
        </div>
      ) : (
        <h2 className="font-semibold text-3xl">Join Chatroom</h2>
      )}
    </div>
  );
};

export default Header;