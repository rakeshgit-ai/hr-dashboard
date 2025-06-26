"use client";
import React from "react";
import { useCreateUserModal } from "@/context/CreateUserModalContext";

export default function CreateUserNavButton() {
  const { open } = useCreateUserModal();
  return (
    <button className="btn btn-primary" onClick={open}>
      Add Employee
    </button>
  );
}