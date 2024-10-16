import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useUserStore = create((set) => ({
  loading: false,

  updateProfile: async (data) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.put("/users/update", data);
      if (res.status === 200) {
        toast.success("Profile updated successfully");
      }
      useAuthStore.getState().setAuthUser(res.data.user);
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
