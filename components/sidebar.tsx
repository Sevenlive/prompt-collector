"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, X, Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"

interface SidebarProps {
  tags: string[]
  selectedTags: string[]
  searchQuery: string
  onSearchChange: (value: string) => void
  onTagToggle: (tag: string) => void
  onClearFilters: () => void
}

export function AppSidebar({
  tags,
  selectedTags,
  searchQuery,
  onSearchChange,
  onTagToggle,
  onClearFilters,
}: SidebarProps) {
  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-border">
      <SidebarHeader className="border-b border-border bg-sidebar p-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-sidebar-foreground/50" />
          <Input
            className="pl-8 bg-sidebar-accent text-sidebar-foreground placeholder:text-sidebar-foreground/50"
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-sidebar">
        <div className="p-4 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold tracking-tight text-sidebar-foreground">Tags</h2>
              {(selectedTags.length > 0 || searchQuery) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden"
                  onClick={onClearFilters}
                >
                  Clear filters
                </Button>
              )}
            </div>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-1">
                {tags.map((tag) => (
                  <Button
                    key={tag}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start font-normal text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      selectedTags.includes(tag) && "bg-sidebar-accent text-sidebar-accent-foreground",
                    )}
                    onClick={() => onTagToggle(tag)}
                  >
                    <Tag className="mr-2 h-4 w-4 shrink-0" />
                    <span className="truncate">{tag}</span>
                    {selectedTags.includes(tag) && <X className="ml-auto h-4 w-4 shrink-0" />}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}

