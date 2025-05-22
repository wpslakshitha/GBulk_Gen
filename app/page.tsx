'use client'
import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ImageIcon, 
  FileText, 
  BarChart3, 
  Mail, 
  Calendar, 
  Users, 
  Code, 
  Sparkles,
  ArrowRight,
  Star,
  TrendingUp
} from 'lucide-react';

const tools = [
  {
    id: 'social-media-generator',
    name: 'Social Media Generator',
    description: 'Create stunning social media posts with custom backgrounds, text, and styling.',
    icon: ImageIcon,
    href: '/social-media-generator',
    color: 'bg-blue-500',
    badge: 'Popular',
    badgeVariant: 'default'
  },
  {
    id: 'content-writer',
    name: 'Content Writer',
    description: 'AI-powered content generation for blogs, articles, and marketing copy.',
    icon: FileText,
    href: '/content-writer',
    color: 'bg-green-500',
    badge: 'New',
    badgeVariant: 'secondary'
  },
  {
    id: 'analytics',
    name: 'Analytics Dashboard',
    description: 'Track performance metrics and visualize data with interactive charts.',
    icon: BarChart3,
    href: '/analytics',
    color: 'bg-purple-500'
  },
  {
    id: 'email-templates',
    name: 'Email Templates',
    description: 'Design professional email templates with drag-and-drop simplicity.',
    icon: Mail,
    href: '/email-templates',
    color: 'bg-yellow-500'
  },
  {
    id: 'calendar',
    name: 'Content Calendar',
    description: 'Plan and schedule your content strategy with an intuitive calendar.',
    icon: Calendar,
    href: '/calendar',
    color: 'bg-red-500'
  },
  {
    id: 'team-management',
    name: 'Team Management',
    description: 'Collaborate with team members and manage project workflows.',
    icon: Users,
    href: '/team',
    color: 'bg-indigo-500'
  },
  {
    id: 'code-generator',
    name: 'Code Generator',
    description: 'Generate code snippets for various programming languages and frameworks.',
    icon: Code,
    href: '/code',
    color: 'bg-gray-500'
  },
  {
    id: 'ai-assistant',
    name: 'AI Assistant',
    description: 'Get intelligent suggestions and automate repetitive tasks.',
    icon: Sparkles,
    href: '/ai-assistant',
    color: 'bg-teal-500',
    badge: 'Beta',
    badgeVariant: 'outline'
  }
];

const featuredTools = tools.slice(0, 3);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              GBulk Tools Suite
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional tools to streamline your workflow, boost productivity, and enhance your content creation process.
            </p>
          </div>

          {/* Featured Tools */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {featuredTools.map((tool) => (
              <Card key={tool.id} className="group hover:shadow-md transition-all duration-200 border-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-md ${tool.color} text-white`}>
                      <tool.icon className="h-5 w-5" />
                    </div>
                    {tool.badge && (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <Badge variant={tool.badgeVariant as any || 'default'}>
            {tool.badge}
          </Badge>
        )}
                  </div>
                  <CardTitle className="mt-4">{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                    <Link href={tool.href}>
                      Launch Tool
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* All Tools */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">All Tools</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tools.map((tool) => (
                <Link 
                  key={tool.id} 
                  href={tool.href}
                  className="group flex items-start p-4 rounded-lg border hover:border-primary hover:bg-accent transition-all duration-200"
                >
                  <div className={`p-2 rounded-md ${tool.color} text-white mr-4 mt-1`}>
                    <tool.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      {tool.name}
                    {tool.badge && (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <Badge variant={tool.badgeVariant as any || 'default'} className="ml-2 text-xs">
            {tool.badge}
          </Badge>
        )}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                    <h3 className="text-3xl font-bold">10,000+</h3>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Content Generated</p>
                    <h3 className="text-3xl font-bold">1M+</h3>
                  </div>
                  <FileText className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                    <h3 className="text-3xl font-bold">4.8/5</h3>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to boost your productivity?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start using our professional tools today and see the difference in your workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/social-media-generator">
                  Get Started
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}