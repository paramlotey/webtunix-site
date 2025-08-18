"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAdminLogoutMutation } from "@/redux/apis/AdminApi";
import { ArrowLeft, ChevronUp, Menu, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
const SidebarComp = ({ children }: { children: React.ReactNode }) => {
  const [logout] = useAdminLogoutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await logout({}).unwrap();
      toast.success(response.message);
      router.push("/admin-login");
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("Failed to log out.");
    }
  };
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader />
        <SidebarContent />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 p-4 bg-white">
        <div className="mb-4">
          <SidebarTrigger className="p-2 border rounded-md bg-gray-100 text-black hover:bg-gray-300 fixed top-1/2"/>
          <Button
            onClick={() => router.back()}
            className="p-2 border rounded-md bg-gray-100 text-black hover:bg-gray-300 fixed top-1"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default SidebarComp;
