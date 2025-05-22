'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  ImageIcon,
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  Mail,
  Calendar,
  Users,
  PanelLeft,
  Code,
  Layers,
  Blocks
} from 'lucide-react'
import { ScrollArea } from './ui/scroll-area'
import { ModeToggle } from './mode-toggle'
import React from 'react'

const tools = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard
  },
  {
    name: 'Social Media Generator',
    href: '/tools/image-gen',
    icon: ImageIcon
  },
  {
    name: 'Blogger Automator',
    href: '/tools/blogger-automator',
    icon: Blocks
  },
  {
    name: 'Content Writer',
    href: '/content-writer',
    icon: FileText
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3
  },
  {
    name: 'Email Templates',
    href: '/email-templates',
    icon: Mail
  },
  {
    name: 'Calendar',
    href: '/calendar',
    icon: Calendar
  },
  {
    name: 'Team Management',
    href: '/team',
    icon: Users
  },
  {
    name: 'Code Generator',
    href: '/code',
    icon: Code
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <div className={cn(
      "relative group border-r border-border bg-background transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">GBulk</span>
          </Link>
        )}
        {collapsed && (
          <Layers className="h-6 w-6 text-primary mx-auto" />
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn("absolute right-2", collapsed ? "right-2" : "right-4")}
          onClick={() => setCollapsed(!collapsed)}
        >
          <PanelLeft className={cn("h-4 w-4 transition-all", collapsed && "rotate-180")} />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="px-3 py-4">
          <div className="space-y-1">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                  pathname === tool.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  collapsed && "justify-center px-0"
                )}
              >
                <tool.icon className={cn("h-5 w-5 shrink-0", collapsed && "h-5 w-5")} />
                {!collapsed && <span>{tool.name}</span>}
              </Link>
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="absolute bottom-4 left-0 right-0 px-3">
        <div className="flex items-center justify-between">
          <Link 
            href="/settings" 
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground",
              collapsed && "justify-center px-0"
            )}
          >
            <Settings className="h-5 w-5" />
            {!collapsed && <span>Settings</span>}
          </Link>
          {!collapsed && <ModeToggle />}
        </div>
      </div>
    </div>
  )
}