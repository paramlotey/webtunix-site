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
import {
  ArrowLeft,
  ChevronUp,
  User2,
  FileText,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  Mail,
  Plus,
  HelpCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      <div className="relative">
        <Sidebar
          collapsible="icon"
          className="border-r border-gray-200 data-[state=collapsed]:w-16 lg:data-[state=collapsed]:w-16"
          variant="sidebar"
        >
          <SidebarHeader className="border-b border-gray-200 p-4 group-data-[collapsible=icon]:p-2">
            <div className="flex items-center gap-2 font-semibold text-gray-900 group-data-[collapsible=icon]:justify-center flex-wrap">
              <div className="flex items-center-safe gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="group-data-[collapsible=icon]:hidden">
                  Admin Panel
                </span>
              </div>
              <Button
                onClick={() => router.back()}
                className="p-2 border rounded-md bg-gray-100 text-black hover:bg-gray-300 "
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
          </SidebarHeader>

          <SidebarContent
            className="p-2 group-data-[collapsible=icon]:p-1 flex-1 overflow-y-auto"
            style={{ scrollbarWidth: "none" }}
            suppressHydrationWarning
          >
            <div className="space-y-1">
              {/* Content Section */}
              <div className="px-3 py-2 group-data-[collapsible=icon]:px-1">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 group-data-[collapsible=icon]:hidden">
                  Content
                </h3>
                <div className="space-y-1">
                  <Link href={"/admin/blogs/create"}>
                    <Tooltip>
                      <TooltipTrigger
                        suppressHydrationWarning
                        className="w-full"
                      >
                        <SidebarMenuButton className="w-full justify-start h-9 px-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-center">
                          <FileText className="h-4 w-4 flex-shrink-0" />
                          <span className="group-data-[collapsible=icon]:hidden ml-2">
                            All Blogs
                          </span>
                        </SidebarMenuButton>
                        <TooltipContent side="right">All Blogs</TooltipContent>
                      </TooltipTrigger>
                    </Tooltip>
                  </Link>
                  <Link href={"/admin/blogs/edit"}>
                    <Tooltip>
                      <TooltipTrigger
                        suppressHydrationWarning
                        className="w-full"
                      >
                        <SidebarMenuButton className="w-full justify-start h-9 px-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-center">
                          <Plus className="h-4 w-4 flex-shrink-0" />
                          <span className="group-data-[collapsible=icon]:hidden ml-2">
                            Create Blog
                          </span>
                        </SidebarMenuButton>
                        <TooltipContent side="right">
                          Create Blog
                        </TooltipContent>
                      </TooltipTrigger>
                    </Tooltip>
                  </Link>
                </div>
              </div>

              {/* Jobs Section */}

              <div className="px-3 py-2 group-data-[collapsible=icon]:px-1">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 group-data-[collapsible=icon]:hidden">
                  Jobs
                </h3>
                <div className="space-y-1">
                  <Link href={"/admin/jobs/edit"}>
                    <Tooltip>
                      <TooltipTrigger
                        suppressHydrationWarning
                        className="w-full"
                      >
                        <SidebarMenuButton className="w-full justify-start h-9 px-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-center">
                          <Briefcase className="h-4 w-4 flex-shrink-0" />
                          <span className="group-data-[collapsible=icon]:hidden ml-2">
                            Job Listings
                          </span>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right">Job Listings</TooltipContent>
                    </Tooltip>
                  </Link>
                  <Link href={"/admin/jobs/create"}>
                    <Tooltip>
                      <TooltipTrigger
                        suppressHydrationWarning
                        className="w-full"
                      >
                        <SidebarMenuButton className="w-full justify-start h-9 px-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-center">
                          <Plus className="h-4 w-4 flex-shrink-0" />
                          <span className="group-data-[collapsible=icon]:hidden ml-2">
                            Post Job
                            <TooltipContent side="right">
                              Post Job
                            </TooltipContent>
                          </span>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                    </Tooltip>
                  </Link>
                  <Tooltip>
                    <TooltipTrigger suppressHydrationWarning className="w-full">
                      <SidebarMenuButton className="w-full justify-start h-9 px-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-center">
                        <FileText className="h-4 w-4 flex-shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden ml-2">
                          Applications
                        </span>
                      </SidebarMenuButton>
                      <TooltipContent side="right">Applications</TooltipContent>
                    </TooltipTrigger>
                  </Tooltip>
                </div>
              </div>

              {/* Management Section */}
              <div className="px-3 py-2 group-data-[collapsible=icon]:px-1">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 group-data-[collapsible=icon]:hidden">
                  Management
                </h3>
                <div className="space-y-1">
                  <Link href={"/admin/users"}>
                    <Tooltip>
                      <TooltipTrigger
                        suppressHydrationWarning
                        className="w-full"
                      >
                        <SidebarMenuButton className="w-full justify-start h-9 px-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-center">
                          <Users className="h-4 w-4 flex-shrink-0" />
                          <span className="group-data-[collapsible=icon]:hidden ml-2">
                            Users
                          </span>
                        </SidebarMenuButton>
                        <TooltipContent side="right">Users</TooltipContent>
                      </TooltipTrigger>
                    </Tooltip>
                  </Link>
                  <Link href={"/admin/enquiries"}>
                    <Tooltip>
                      <TooltipTrigger
                        suppressHydrationWarning
                        className="w-full"
                      >
                        <SidebarMenuButton className="w-full justify-start h-9 px-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-center">
                          <Mail className="h-4 w-4 flex-shrink-0" />
                          <span className="group-data-[collapsible=icon]:hidden ml-2">
                            Enquiries
                          </span>
                        </SidebarMenuButton>
                        <TooltipContent side="right">Enquiries</TooltipContent>
                      </TooltipTrigger>
                    </Tooltip>
                  </Link>
                  <Link href={"/admin/faq"}>
                    <Tooltip>
                      <TooltipTrigger
                        suppressHydrationWarning
                        className="w-full"
                      >
                        <SidebarMenuButton className="w-full justify-start h-9 px-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-center">
                          <HelpCircle className="h-4 w-4 flex-shrink-0" />
                          <span className="group-data-[collapsible=icon]:hidden ml-2">
                            {`Faq's`}
                          </span>
                        </SidebarMenuButton>
                        <TooltipContent side="right">{`Faq's`}</TooltipContent>
                      </TooltipTrigger>
                    </Tooltip>
                  </Link>
                  <SidebarMenuButton className="w-full justify-start h-9 px-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-center">
                    <BarChart3 className="h-4 w-4 flex-shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden ml-2">
                      Analytics
                    </span>
                  </SidebarMenuButton>
                </div>
              </div>

              {/* System Section */}
              <div className="px-3 py-2 group-data-[collapsible=icon]:px-1">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 group-data-[collapsible=icon]:hidden">
                  System
                </h3>
                <div className="space-y-1">
                  <Link href={"/admin/settings"}>
                    <Tooltip>
                      <TooltipTrigger
                        suppressHydrationWarning
                        className="w-full"
                      >
                        <SidebarMenuButton className="w-full justify-start h-9 px-3 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-center">
                          <Settings className="h-4 w-4 flex-shrink-0" />
                          <span className="group-data-[collapsible=icon]:hidden ml-2">
                            Settings
                          </span>
                        </SidebarMenuButton>
                        <TooltipContent side="right">Settings</TooltipContent>
                      </TooltipTrigger>
                    </Tooltip>
                  </Link>
                </div>
              </div>
            </div>
            <SidebarTrigger className="absolute -right-8 top-1 md:-right-3 md:top-1/2 shadow-md hover:shadow-lg transition-shadow z-50 p-2 border rounded-md bg-gray-100 text-black hover:bg-gray-300" />
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-2 group-data-[collapsible=icon]:p-1">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="w-full h-12 px-3 hover:bg-gray-100 rounded-md group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-center">
                      <div className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                          <User2 className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="flex flex-col items-start flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                          <span className="text-sm font-medium text-gray-900 truncate">
                            Admin User
                          </span>
                          <span className="text-xs text-gray-500 truncate">
                            admin@example.com
                          </span>
                        </div>
                        <ChevronUp className="h-4 w-4 text-gray-400 group-data-[collapsible=icon]:hidden" />
                      </div>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    align="start"
                    className="w-60 mb-2"
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      <User2 className="h-4 w-4 mr-2" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      <span>Account Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      </div>

      <main className="flex-1 bg-white min-h-screen">
        <div className="lg:p-6 md:p-4 p-3">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default SidebarComp;
