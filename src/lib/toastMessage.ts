import toast from "react-hot-toast";

type MessageType = "success" | "error";

export const toastMessage = (type: MessageType, message: string, duration: number) => {
  if (type == "success") {
    toast.success(`${message}`, {
      duration,
      // icon: "👏️😉️",
      style: {
        borderRadius: '10px',
        background: '#18181b',
        color: '#f3f4f6',
        fontSize: 18,
        fontWeight: 500,
      },
    });
  }

  if (type == "error") {
    toast.error(`${message}`, {
      duration,
      style: {
        borderRadius: '10px',
        background: '#18181b',
        color: '#f3f4f6',
        fontSize: 18,
        fontWeight: 500,
      },
    });
  }

}
