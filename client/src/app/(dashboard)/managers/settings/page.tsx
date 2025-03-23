"use client";
import SettingsForm from "@/components/SettingsForm";
import {
  useGetAuthUserQuery,
  useUpdateManagerSettingsMutation,
} from "@/state/api";
import React from "react";

function ManagerSettings() {
  const { data: authUser, isLoading } = useGetAuthUserQuery();
  const [updateManager] = useUpdateManagerSettingsMutation();

  if (isLoading) return <>Loading...</>;
  const initialData = {
    name: authUser?.userInfo?.name,
    email: authUser?.userInfo?.email,
    phoneNumber: authUser?.userInfo?.phoneNumber,
  };

  const handleSubmit = async (data: typeof initialData) => {
    await updateManager({ cognitoId: authUser?.userInfo.cognitoId, ...data });
  };

  return (
    <SettingsForm
      initialData={initialData}
      onSubmit={handleSubmit}
      userType="manager"
    />
  );
}

export default ManagerSettings;
