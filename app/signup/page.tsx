"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  useAdminLoginMutation,
  useAdminSignupMutation,
} from "@/redux/apis/AdminApi";
import { isApiError } from "@/components/Common/ApiError";


const AdminSignup = () => {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const [adminSignup, { isLoading }] = useAdminSignupMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await adminSignup(form).unwrap();
      console.log(response);
      toast.success("Signup Successful");
      router.push("/admin-login");
    } catch (err: unknown) {
      if (isApiError(err)) {
        toast.error(err.data?.message || "Signup Failed");
      } else {
        toast.error("Signup Failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Admin Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <Button
              className="w-full"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Signup"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSignup;