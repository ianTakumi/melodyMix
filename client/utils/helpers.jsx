import { createNotifications } from "react-native-notificated";

const { useNotifications } = createNotifications({
  isNotch: true,

  defaultStylesSettings: {
    darkMode: true,
    globalConfig: {
      borderRadius: 5000,
    },
  },
});

const { notify } = useNotifications();

export const notifyToast = (title, description, status) => {
  notify(status, {
    params: {
      title: title,
      description: description,
    },
  });
};
