import React from "react";

export default function userProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      userProfile
      <p className="text-4xl">{params?.id}</p>
    </div>
  );
}
