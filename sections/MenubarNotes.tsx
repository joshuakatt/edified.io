import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EducationalMenubar() {
  return (
    <div className="relative bg-gray-200 p-4">
      {/* Menubar Section */}
      <div className="flex">
      <Menubar>
        {/* File Menu */}
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New Notebook</MenubarItem>
            <MenubarItem>Open Notebook</MenubarItem>
            <MenubarItem>Save</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Export Notebook</MenubarItem>
            <MenubarItem>Print Current Notebook</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* Edit Menu */}
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
            <MenubarItem>Redo</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* View Menu */}
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Zoom In</MenubarItem>
            <MenubarItem>Zoom Out</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Show/Hide Reference Panel</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* Insert Menu */}
        <MenubarMenu>
          <MenubarTrigger>Insert</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Image</MenubarItem>
            <MenubarItem>Table</MenubarItem>
            <MenubarItem>Link</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* Format Menu */}
        <MenubarMenu>
          <MenubarTrigger>Format</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Bold</MenubarItem>
            <MenubarItem>Italic</MenubarItem>
            <MenubarItem>Underline</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* Reference Menu */}
        <MenubarMenu>
          <MenubarTrigger>Reference</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Insert Citation</MenubarItem>
            <MenubarItem>Manage Sources</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* Help Menu */}
        <MenubarMenu>
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>FAQ</MenubarItem>
            <MenubarItem>Tutorials</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      </div>
      {/* <div className="absolute top-0 right-0 pr-3 pt-3"> 
        <Avatar>
          <AvatarFallback>JK</AvatarFallback>
        </Avatar>
      </div>*/}
    </div>
    
  );
};