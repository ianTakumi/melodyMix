import { View, Text, TextInput, Modal, TouchableOpacity } from "react-native";
import axiosInstance from "../../utils/AxiosInstance";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import ProfilePicture from "../../components/ProfilePicture";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { useRouter } from "expo-router";
import { notifyToast } from "../../utils/helpers";
import { useAppDispatch } from "../redux/hooks";
import { updateUser } from "../redux/slices/AuthSlice";

const UpdateProfile = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const data = [
    { key: "Man", value: "Man" },
    { key: "Woman", value: "Woman" },
    { key: "Prefer not to say", value: "Prefer not to say" },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      dob: null,
      gender: "",
    },
  });

  useEffect(() => {
    if (user.data) {
      setValue("name", user.data.name || "");
      setValue("email", user.data.email || "");
      setValue("phoneNumber", user.data.phoneNumber || "");
      setValue("dob", user.data.dob || null);
      setValue("gender", user.data.gender || "");
    }
  }, [user.data, setValue]);

  const onSubmit = (data: any) => {
    const userId = user.data?._id;
    axiosInstance.put(`/users/${userId}`, data).then((response) => {
      if (response.status === 200) {
        const user = response.data.user;
        notifyToast("Success", response.data.message, "success");
        dispatch(updateUser({ user: user }));
      }
    });
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView className="bg-[#121212] flex-1">
      <View className="flex flex-row items-center justify-between mx-3 my-2">
        <TouchableOpacity onPress={handleClose}>
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Edit profile</Text>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text className="text-gray-700 text-xl">Save</Text>
        </TouchableOpacity>
      </View>
      <View className="mx-3 my-8 flex items-center">
        <ProfilePicture name={user.data?.name} imageUrl={""} size={120} />
      </View>
      <View className="flex flex-row mt-7 mx-3  py-2 border-b border-[#202020] items-center">
        <Text className="text-white text-xl font-bold mr-10">Name</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onBlur={onBlur}
              className="text-white text-xl"
              onChangeText={onChange}
              placeholder="Name"
              placeholderTextColor={"#353535"}
            />
          )}
        />
      </View>
      {errors.name && (
        <Text className="text-red-500 mx-4 mt-2">{errors.name.message}</Text>
      )}
      <View className="flex flex-row mt-7 mx-3  py-2 border-b border-[#202020] items-center w-full">
        <Text className="text-white text-xl font-bold mr-10">Email</Text>

        <Controller
          control={control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              className="text-white text-xl"
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Email"
              placeholderTextColor={"#353535"}
            />
          )}
        />
      </View>
      {errors.email && (
        <Text className="text-red-500 mx-4 mt-2">{errors.email.message}</Text>
      )}
      <View className="flex flex-row mt-7 mx-3  py-2 border-b border-[#202020] items-center">
        <Text className="text-white text-xl font-bold mr-10">Phone Number</Text>
        <Controller
          control={control}
          name="phoneNumber"
          rules={{ required: "Phone number is required", maxLength: 11 }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              className="text-white text-xl"
              maxLength={11}
              placeholder="Phone Number"
              placeholderTextColor={"#353535"}
            />
          )}
        />
      </View>
      {errors.phoneNumber && (
        <Text className="text-red-500 mx-4 mt-2">
          {errors.phoneNumber.message}
        </Text>
      )}
      <View className="flex flex-row mt-7 mx-3  py-2 border-b border-[#202020] items-center">
        <Text className="text-white text-xl font-bold mr-10">
          Date of Birth
        </Text>
        <Controller
          control={control}
          name="dob"
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
                <Text className="text-white text-xl">
                  {value ? dayjs(value).format("YYYY-MM-DD") : "Select Date"}
                </Text>
              </TouchableOpacity>

              {isDatePickerVisible && (
                <Modal transparent animationType="fade">
                  <View
                    className="px-5"
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <View
                      className="bg-[#121212]"
                      style={{
                        padding: 20,
                        borderRadius: 10,
                      }}
                    >
                      <DateTimePicker
                        mode="single"
                        headerButtonColor="#fff"
                        date={value || new Date()}
                        selectedItemColor="#43b9ea"
                        headerTextStyle={{ color: "#fff" }}
                        weekDaysTextStyle={{ color: "#fff" }}
                        calendarTextStyle={{ color: "#fff" }}
                        yearContainerStyle={{ backgroundColor: "#121212" }}
                        onChange={(params) => {
                          setDatePickerVisible(false);
                          if (params.date) {
                            onChange(params.date); // Update the form with the new date
                          }
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => setDatePickerVisible(false)}
                      >
                        <Text className="text-white text-center mt-3">
                          Close
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              )}
            </>
          )}
        />
      </View>
      {errors.dob && (
        <Text className="text-red-500 mx-4 mt-2">{errors.dob.message}</Text>
      )}
      <View className="flex flex-row mt-7 mx-3  py-2 border-b border-[#202020] items-center">
        <Text className="text-white text-xl font-bold mr-10">Gender</Text>
        <Controller
          control={control}
          name="gender"
          rules={{ required: "Gender is required" }}
          render={({ field: { onChange, value } }) => (
            <SelectList
              setSelected={onChange}
              defaultOption={data.find((option) => option.value === value)}
              data={data}
              boxStyles={{ width: 280, backgroundColor: "#121212" }} // Styles the box wrapper
              inputStyles={{ color: "#fff" }} // Makes the search input and selected text white
              dropdownStyles={{ backgroundColor: "#121212" }} // Optional: Styles dropdown background
              dropdownTextStyles={{ color: "#fff" }} // Makes dropdown list items white
              disabledTextStyles={{ color: "#fff" }} // Styles disabled dropdown list items text
              searchPlaceholder="Select a gender"
            />
          )}
        />
      </View>
      {errors.gender && (
        <Text className="text-red-500 mx-4 mt-2">{errors.gender.message}</Text>
      )}
    </SafeAreaView>
  );
};

export default UpdateProfile;
