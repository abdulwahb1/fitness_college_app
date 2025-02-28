import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuth } from "@/context/AuthContext";

const useGetUserBmi = () => {
  const { user } = useAuth();
  const getUserBmi = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("bmi")
      .eq("id", user?.id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  };

  return useQuery({
    queryFn: getUserBmi,
    queryKey: ["getUserBmi", user?.id],
    enabled: !!user?.id,
  });
};

const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const updateUserProfile = async ({ bmi }: { bmi: string }) => {
    const { error } = await supabase
      .from("profiles")
      .update({ bmi })
      .eq("id", user?.id);

    if (error) {
      throw error;
    }
  };

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getUserBmi", user?.id], // Fix query key to match getUserBmi
      });
    },
  });
};

export { useGetUserBmi, useUpdateUserProfile };
