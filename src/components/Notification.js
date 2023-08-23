const Notification = ({ notification }) => {
  if (!notification) {
    return null; // Don't render if there's no active notification
  }

  const notificationClassName =
    notification.type === "warning" ? "warning" : "info";

  return (
    <div className={`notification ${notificationClassName}`}>
      {notification.message}
    </div>
  );
};

export default Notification;
