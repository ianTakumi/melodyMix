import { createNotifications } from "react-native-notificated";

const { useNotifications } = createNotifications({
  defaultStylesSettings: {
    darkMode: false,
    globalConfig: {
      borderRadius: 5000,
    },
  },
});

const { notify } = useNotifications();

type NotificationStatus = "success" | "error" | "info" | "warning";

export const notifyToast = (
  title: string,
  description: string,
  status: NotificationStatus
) => {
  notify(status, {
    params: {
      title: title,
      description: description,
    },
  });
};
