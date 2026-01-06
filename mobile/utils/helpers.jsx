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

export const genres = [
  { key: "1", value: "Rock" },
  { key: "2", value: "Pop" },
  { key: "3", value: "Hip-Hop" },
  { key: "4", value: "Jazz" },
  { key: "5", value: "Classical" },
  { key: "6", value: "Electronic" },
  { key: "7", value: "Country" },
  { key: "8", value: "Indie" },
  { key: "9", value: "Blues" },
  { key: "10", value: "Reggae" },
];

export const genreColors = {
  Rock: "#FF5733", // Vibrant Red-Orange
  Pop: "#337BFF", // Bright Blue
  "Hip-Hop": "#33FF57", // Neon Green
  Jazz: "#FFD700", // Gold
  Classical: "#8A2BE2", // Blue-Violet
  Electronic: "#00CED1", // Dark Turquoise
  Country: "#A52A2A", // Brown
  Indie: "#FF69B4", // Hot Pink
  Blues: "#1E90FF", // Dodger Blue
  Reggae: "#32CD32", // Lime Green
};
