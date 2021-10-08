const Message = ({ message, username, currentUser }) => {
  return (
    <div className={`${currentUser ? "justify-content-end" : "justify-content-start"} d-flex mb-4`}>
        <p>{!currentUser && username}</p>
        <div className={`${currentUser ? "msg_cotainer_send" : "msg_cotainer"}`}>
            {message}
        </div>
    </div>
    
  );
};

export default Message;