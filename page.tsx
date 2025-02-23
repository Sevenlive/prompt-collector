"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { ThemeToggle } from "./components/theme-toggle"
import { AddPromptDialog } from "./components/add-prompt-dialog"
import { AppSidebar } from "./components/sidebar"
import { cn } from "@/lib/utils"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"

// Types for our data
interface Prompt {
  title: string
  description: string
  tags: string[]
}

export default function PromptCollector() {
  // Example data - in a real app this would come from a database
  const tags = [
    "Writing",
    "Programming",
    "Marketing",
    "SEO",
    "Business",
    "Creative",
    "Academic",
    "Technical",
    "Education",
    "Research",
  ]

  const allPrompts: Prompt[] = [
    {
      title: "Blog Post Outline Generator",
      description:
        "Create a detailed blog post outline about [topic] including introduction, main points, and conclusion.",
      tags: ["Writing", "Marketing", "SEO"],
    },
    {
      title: "Code Refactoring Assistant",
      description: "Analyze this code snippet and suggest improvements for better readability and performance.",
      tags: ["Programming", "Technical"],
    },
    {
      title: "Research Paper Summary",
      description: "Summarize this academic paper in simple terms, highlighting key findings and methodology.",
      tags: ["Academic", "Research", "Education"],
    },
  ]

  // State for search and filters
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])

  // Filter prompts based on search query and selected tags
  const filteredPrompts = React.useMemo(() => {
    return allPrompts.filter((prompt) => {
      // Check if prompt matches search query
      const matchesSearch =
        searchQuery === "" ||
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Check if prompt has all selected tags
      const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => prompt.tags.includes(tag))

      return matchesSearch && matchesTags
    })
  }, [searchQuery, selectedTags])

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedTags([])
    setSearchQuery("")
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen bg-background">
        <AppSidebar
          tags={tags}
          selectedTags={selectedTags}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onTagToggle={toggleTag}
          onClearFilters={clearFilters}
        />

        {/* Main Content */}
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center justify-between px-4 md:px-8">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold">Prompts</h1>
                {(selectedTags.length > 0 || searchQuery) && (
                  <Badge variant="secondary" className="rounded-md">
                    {filteredPrompts.length} results
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4">
                <AddPromptDialog tags={tags} />
                <ThemeToggle />
              </div>
            </div>
            {/* Active filters */}
            {selectedTags.length > 0 && (
              <div className="border-t px-4 py-2 flex items-center gap-2 md:px-8">
                <span className="text-sm text-muted-foreground">Filters:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => toggleTag(tag)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {tag} filter</span>
                      </Button>
                    </Badge>
                  ))}
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={clearFilters}>
                    Clear all
                  </Button>
                </div>
              </div>
            )}
          </header>

          <main className="p-4 md:p-8">
            {filteredPrompts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No prompts found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPrompts.map((prompt, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle>{prompt.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{prompt.description}</p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex flex-wrap gap-2">
                        {prompt.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className={cn(selectedTags.includes(tag) && "bg-primary text-primary-foreground")}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

