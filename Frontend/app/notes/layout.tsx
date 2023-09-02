import MenubarNotes from "@/sections/MenubarNotes"

export default function notesLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        
        <nav>
        <MenubarNotes />

        </nav>
   
        {children}
      </section>
    )
    }