'use client'
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Calendar, 
  Settings, 
  Search, 
  Clock, 
  Sparkles, 
  BarChart3, 
  Globe, 
  Loader2,
  CheckCircle2,
  Save,
  Send
} from 'lucide-react';

// Types for blog content
interface BlogPost {
  id: string;
  title: string;
  content: string;
  keywords: string[];
  category: string;
  status: 'draft' | 'scheduled' | 'published';
  scheduledDate?: string;
  seoScore?: number;
  readabilityScore?: number;
  featuredImage?: string;
}

// Types for content ideas
interface ContentIdea {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
}

// Types for SEO settings
interface SeoSettings {
  focusKeyword: string;
  metaDescription: string;
  optimizeHeadings: boolean;
  optimizeImages: boolean;
  internalLinking: boolean;
  readabilityCheck: boolean;
}

// Sample data
const sampleBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React Hooks',
    content: 'React Hooks are a powerful feature that allows you to use state and other React features without writing a class...',
    keywords: ['react', 'hooks', 'javascript', 'frontend'],
    category: 'Web Development',
    status: 'published',
    seoScore: 85,
    readabilityScore: 92
  },
  {
    id: '2',
    title: 'The Ultimate Guide to Content Marketing',
    content: 'Content marketing is a strategic approach focused on creating valuable, relevant content to attract a target audience...',
    keywords: ['marketing', 'content', 'strategy', 'digital'],
    category: 'Marketing',
    status: 'scheduled',
    scheduledDate: '2023-12-15T10:00',
    seoScore: 78,
    readabilityScore: 88
  },
  {
    id: '3',
    title: 'How to Optimize Your Website for SEO',
    content: 'Search Engine Optimization (SEO) is crucial for improving your website visibility in search results...',
    keywords: ['seo', 'website', 'optimization', 'search engine'],
    category: 'SEO',
    status: 'draft',
    seoScore: 65,
    readabilityScore: 75
  }
];

const sampleContentIdeas: ContentIdea[] = [
  {
    id: '1',
    title: '10 Essential JavaScript Array Methods',
    description: 'A comprehensive guide to the most useful array methods in JavaScript with practical examples.',
    keywords: ['javascript', 'arrays', 'programming', 'web development'],
    difficulty: 'medium',
    estimatedTime: '3 hours'
  },
  {
    id: '2',
    title: 'Building a Responsive Navigation Menu',
    description: 'Step-by-step tutorial on creating a responsive navigation menu using HTML, CSS, and JavaScript.',
    keywords: ['responsive', 'navigation', 'css', 'html', 'javascript'],
    difficulty: 'easy',
    estimatedTime: '2 hours'
  },
  {
    id: '3',
    title: 'Understanding Web Accessibility Standards',
    description: 'An in-depth look at web accessibility guidelines and how to implement them in your projects.',
    keywords: ['accessibility', 'a11y', 'wcag', 'inclusive design'],
    difficulty: 'hard',
    estimatedTime: '5 hours'
  }
];

const categories = [
  'Web Development',
  'Marketing',
  'SEO',
  'Design',
  'Technology',
  'Business',
  'Productivity'
];

export default function BloggerAutomation() {
  const [activeTab, setActiveTab] = useState('content-generator');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(sampleBlogPosts);
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>(sampleContentIdeas);
  const [isGenerating, setIsGenerating] = useState(false);
  const [seoSettings, setSeoSettings] = useState<SeoSettings>({
    focusKeyword: '',
    metaDescription: '',
    optimizeHeadings: true,
    optimizeImages: true,
    internalLinking: true,
    readabilityCheck: true
  });
  
  // Current editing post
  const [currentPost, setCurrentPost] = useState<BlogPost>({
    id: '',
    title: '',
    content: '',
    keywords: [],
    category: '',
    status: 'draft'
  });

  // Generate content function
  const generateContent = () => {
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: 'How to Improve Your Website Performance',
        content: 'Website performance is crucial for user experience and SEO rankings. In this article, we will explore various techniques to optimize your website speed and performance...',
        keywords: ['performance', 'optimization', 'web development', 'speed'],
        category: 'Web Development',
        status: 'draft',
        seoScore: 70,
        readabilityScore: 80
      };
      
      setBlogPosts([newPost, ...blogPosts]);
      setCurrentPost(newPost);
      setIsGenerating(false);
      setActiveTab('content-editor');
    }, 2000);
  };

  // Generate content ideas
  const generateContentIdeas = () => {
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const newIdeas: ContentIdea[] = [
        {
          id: Date.now().toString(),
          title: 'The Future of Artificial Intelligence in Content Creation',
          description: 'Explore how AI is transforming content creation and what it means for content creators.',
          keywords: ['ai', 'artificial intelligence', 'content creation', 'future'],
          difficulty: 'medium',
          estimatedTime: '4 hours'
        },
        {
          id: (Date.now() + 1).toString(),
          title: '5 Effective Strategies for Email Marketing',
          description: 'Learn proven email marketing strategies to improve open rates and conversions.',
          keywords: ['email marketing', 'strategy', 'conversion', 'open rates'],
          difficulty: 'easy',
          estimatedTime: '2 hours'
        }
      ];
      
      setContentIdeas([...newIdeas, ...contentIdeas]);
      setIsGenerating(false);
    }, 2000);
  };

  // Save post function
const savePost = () => {
  if (currentPost.id) {
    // Update existing post
    setBlogPosts(blogPosts.map(post => 
      post.id === currentPost.id ? currentPost : post
    ));
  } else {
    // Create new post
    const newPost: BlogPost = {
      ...currentPost,
      id: Date.now().toString(),
      status: 'draft' // Explicitly set as 'draft'
    };
    setBlogPosts([newPost, ...blogPosts]);
    setCurrentPost(newPost);
  }
};



  // Schedule post function
  const schedulePost = (id: string, date: string) => {
    setBlogPosts(blogPosts.map(post => 
      post.id === id ? { ...post, status: 'scheduled', scheduledDate: date } : post
    ));
  };

  // Analyze SEO function
  const analyzeSeo = (post: BlogPost) => {
    // Simulate SEO analysis
    const seoScore = Math.floor(Math.random() * 30) + 70;
    const readabilityScore = Math.floor(Math.random() * 25) + 75;
    
    return {
      ...post,
      seoScore,
      readabilityScore
    };
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Blogger Automation</h1>
            <p className="text-muted-foreground mt-1">Streamline your blogging workflow with AI-powered tools</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Settings size={16} />
            Settings
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="content-generator" className="flex items-center gap-2">
              <Sparkles size={16} />
              <span className="hidden sm:inline">Content Generator</span>
              <span className="inline sm:hidden">Generator</span>
            </TabsTrigger>
            <TabsTrigger value="content-editor" className="flex items-center gap-2">
              <FileText size={16} />
              <span className="hidden sm:inline">Content Editor</span>
              <span className="inline sm:hidden">Editor</span>
            </TabsTrigger>
            <TabsTrigger value="content-ideas" className="flex items-center gap-2">
              <Search size={16} />
              <span className="hidden sm:inline">Content Ideas</span>
              <span className="inline sm:hidden">Ideas</span>
            </TabsTrigger>
            <TabsTrigger value="scheduler" className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="hidden sm:inline">Content Scheduler</span>
              <span className="inline sm:hidden">Scheduler</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 size={16} />
              <span className="hidden sm:inline">Content Analytics</span>
              <span className="inline sm:hidden">Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Content Generator Tab */}
          <TabsContent value="content-generator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Content Generator</CardTitle>
                <CardDescription>
                  Generate high-quality blog content with AI assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">Blog Topic</Label>
                  <Input 
                    id="topic" 
                    placeholder="e.g., Web Performance Optimization" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords (comma separated)</Label>
                  <Input 
                    id="keywords" 
                    placeholder="e.g., performance, optimization, speed, web" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tone">Content Tone</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="informative">Informative</SelectItem>
                        <SelectItem value="persuasive">Persuasive</SelectItem>
                        <SelectItem value="entertaining">Entertaining</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="length">Content Length</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short (~500 words)</SelectItem>
                      <SelectItem value="medium">Medium (~1000 words)</SelectItem>
                      <SelectItem value="long">Long (~1500 words)</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive (~2000+ words)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="seo-optimized">SEO Optimized</Label>
                    <Switch id="seo-optimized" defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-images">Include Image Suggestions</Label>
                    <Switch id="include-images" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={generateContent} 
                  disabled={isGenerating} 
                  className="w-full gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating Content...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate Blog Content
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Generations</CardTitle>
                <CardDescription>
                  Your recently generated blog content
                </CardDescription>
              </CardHeader>
              <CardContent>
                {blogPosts.length > 0 ? (
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {blogPosts.map(post => (
                        <div key={post.id} className="p-4 border rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{post.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {post.content}
                              </p>
                              <div className="flex items-center mt-2 space-x-2">
                                <Badge variant="outline">{post.category}</Badge>
                                <Badge 
                                  variant={
                                    post.status === 'published' ? 'default' : 
                                    post.status === 'scheduled' ? 'secondary' : 'outline'
                                  }
                                >
                                  {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                                </Badge>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setCurrentPost(post);
                                setActiveTab('content-editor');
                              }}
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium text-lg">No content generated yet</h3>
                    <p className="text-muted-foreground mt-1">
                      Use the form above to generate your first blog post
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Editor Tab */}
          <TabsContent value="content-editor" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Content Editor</CardTitle>
                    <CardDescription>
                      Edit and optimize your blog content
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={savePost}
                      className="gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save Draft
                    </Button>
                    <Button 
                      size="sm"
                      className="gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Publish
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="post-title">Title</Label>
                  <Input 
                    id="post-title" 
                    value={currentPost.title}
                    onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                    placeholder="Enter blog post title" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-category">Category</Label>
                    <Select 
                      value={currentPost.category}
                      onValueChange={(value) => setCurrentPost({...currentPost, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="post-keywords">Keywords</Label>
                    <Input 
                      id="post-keywords" 
                      value={currentPost.keywords.join(', ')}
                      onChange={(e) => setCurrentPost({
                        ...currentPost, 
                        keywords: e.target.value.split(',').map(k => k.trim())
                      })}
                      placeholder="Enter keywords, separated by commas" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="post-content">Content</Label>
                  <Textarea 
                    id="post-content" 
                    value={currentPost.content}
                    onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
                    placeholder="Write your blog post content here..." 
                    className="min-h-[300px]"
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Analysis</CardTitle>
                  <CardDescription>
                    Optimize your content for search engines
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="focus-keyword">Focus Keyword</Label>
                    <Input 
                      id="focus-keyword" 
                      value={seoSettings.focusKeyword}
                      onChange={(e) => setSeoSettings({...seoSettings, focusKeyword: e.target.value})}
                      placeholder="e.g., web performance" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Textarea 
                      id="meta-description" 
                      value={seoSettings.metaDescription}
                      onChange={(e) => setSeoSettings({...seoSettings, metaDescription: e.target.value})}
                      placeholder="Enter meta description (150-160 characters recommended)" 
                      className="h-20"
                    />
                    <p className="text-xs text-muted-foreground">
                      {seoSettings.metaDescription.length} / 160 characters
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="optimize-headings" className="cursor-pointer">Optimize Headings</Label>
                      <Switch 
                        id="optimize-headings" 
                        checked={seoSettings.optimizeHeadings}
                        onCheckedChange={(checked) => setSeoSettings({...seoSettings, optimizeHeadings: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="optimize-images" className="cursor-pointer">Optimize Images</Label>
                      <Switch 
                        id="optimize-images" 
                        checked={seoSettings.optimizeImages}
                        onCheckedChange={(checked) => setSeoSettings({...seoSettings, optimizeImages: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="internal-linking" className="cursor-pointer">Internal Linking</Label>
                      <Switch 
                        id="internal-linking" 
                        checked={seoSettings.internalLinking}
                        onCheckedChange={(checked) => setSeoSettings({...seoSettings, internalLinking: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="readability-check" className="cursor-pointer">Readability Check</Label>
                      <Switch 
                        id="readability-check" 
                        checked={seoSettings.readabilityCheck}
                        onCheckedChange={(checked) => setSeoSettings({...seoSettings, readabilityCheck: checked})}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={() => {
                      const analyzedPost = analyzeSeo(currentPost);
                      setCurrentPost(analyzedPost);
                    }}
                  >
                    <Search className="h-4 w-4" />
                    Analyze SEO
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Content Insights</CardTitle>
                  <CardDescription>
                    Performance metrics and improvement suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {currentPost.seoScore && currentPost.readabilityScore ? (
                    <>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <Label>SEO Score</Label>
                            <span className={
                              currentPost.seoScore >= 80 ? "text-green-500" :
                              currentPost.seoScore >= 60 ? "text-yellow-500" : "text-red-500"
                            }>
                              {currentPost.seoScore}/100
                            </span>
                          </div>
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                currentPost.seoScore >= 80 ? "bg-green-500" :
                                currentPost.seoScore >= 60 ? "bg-yellow-500" : "bg-red-500"
                              }`}
                              style={{ width: `${currentPost.seoScore}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <Label>Readability Score</Label>
                            <span className={
                              currentPost.readabilityScore >= 80 ? "text-green-500" :
                              currentPost.readabilityScore >= 60 ? "text-yellow-500" : "text-red-500"
                            }>
                              {currentPost.readabilityScore}/100
                            </span>
                          </div>
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                currentPost.readabilityScore >= 80 ? "bg-green-500" :
                                currentPost.readabilityScore >= 60 ? "bg-yellow-500" : "bg-red-500"
                              }`}
                              style={{ width: `${currentPost.readabilityScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-3">
                        <h3 className="font-medium">Improvement Suggestions</h3>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <p className="text-sm">Good keyword density in the content</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                            <p className="text-sm">Consider adding more internal links</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                            <p className="text-sm">Add more subheadings to improve structure</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                            <p className="text-sm">Sentences are too long, consider shortening them</p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium text-lg">No analysis yet</h3>
                    <p className="text-muted-foreground mt-1 mb-4">
  Click &quot;Analyze SEO&quot; to get content insights
</p>
                      <Button 
                        variant="outline" 
                        className="gap-2"
                        onClick={() => {
                          const analyzedPost = analyzeSeo(currentPost);
                          setCurrentPost(analyzedPost);
                        }}
                      >
                        <Search className="h-4 w-4" />
                        Analyze Now
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Ideas Tab */}
          <TabsContent value="content-ideas" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Content Ideas Generator</CardTitle>
                    <CardDescription>
                      Generate blog post ideas based on your niche and keywords
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={generateContentIdeas} 
                    disabled={isGenerating}
                    className="gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Generate Ideas
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="niche">Your Niche</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select niche" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                                                ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="target-audience">Target Audience</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginners">Beginners</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="professionals">Professionals</SelectItem>
                        <SelectItem value="business-owners">Business Owners</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content-type">Content Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="how-to">How-to Guides</SelectItem>
                        <SelectItem value="listicle">Listicles</SelectItem>
                        <SelectItem value="case-study">Case Studies</SelectItem>
                        <SelectItem value="tutorial">Tutorials</SelectItem>
                        <SelectItem value="opinion">Opinion Pieces</SelectItem>
                        <SelectItem value="review">Reviews</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="topic-keywords">Topic Keywords (comma separated)</Label>
                  <Input 
                    id="topic-keywords" 
                    placeholder="e.g., javascript, react, web development" 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Number of Ideas to Generate</Label>
                    <span className="text-sm text-muted-foreground">5 ideas</span>
                  </div>
                  <Slider 
                    defaultValue={[5]} 
                    max={10} 
                    min={1} 
                    step={1}
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contentIdeas.map((idea) => (
                <Card key={idea.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge 
                        variant={
                          idea.difficulty === 'easy' ? 'default' : 
                          idea.difficulty === 'medium' ? 'secondary' : 'destructive'
                        }
                        className="mb-2"
                      >
                        {idea.difficulty.charAt(0).toUpperCase() + idea.difficulty.slice(1)}
                      </Badge>
                      <Badge variant="outline" className="ml-2">
                        <Clock className="h-3 w-3 mr-1" />
                        {idea.estimatedTime}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{idea.title}</CardTitle>
                    <CardDescription className="mt-2 line-clamp-3">
                      {idea.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1 mt-2">
                      {idea.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-muted-foreground"
                      onClick={() => {
                        setCurrentPost({
                          id: '',
                          title: idea.title,
                          content: idea.description,
                          keywords: idea.keywords,
                          category: '',
                          status: 'draft'
                        });
                        setActiveTab('content-editor');
                      }}
                    >
                      Use This Idea
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-muted-foreground"
                    >
                      Save
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Scheduler Tab */}
          <TabsContent value="scheduler" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Calendar</CardTitle>
                <CardDescription>
                  Schedule and manage your blog post publishing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-6 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-lg">Calendar View Coming Soon</h3>
                 <p className="text-muted-foreground mt-1 mb-4 max-w-md mx-auto">
  We&apos;re working on a full calendar view for content scheduling.
</p>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-4">Scheduled Posts</h3>
                  <div className="space-y-4">
                    {blogPosts
                      .filter(post => post.status === 'scheduled')
                      .map(post => (
                        <div key={post.id} className="flex items-center justify-between p-4 border rounded-md">
                          <div>
                            <h4 className="font-medium">{post.title}</h4>
                            <div className="flex items-center mt-1 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>
                                {post.scheduledDate ? new Date(post.scheduledDate).toLocaleString() : 'Not scheduled'}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setCurrentPost(post);
                                setActiveTab('content-editor');
                              }}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm"
                            >
                              Publish Now
                            </Button>
                          </div>
                        </div>
                      ))}
                    
                    {blogPosts.filter(post => post.status === 'scheduled').length === 0 && (
                      <div className="text-center py-8 border rounded-md">
                        <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-medium text-lg">No Scheduled Posts</h3>
                        <p className="text-muted-foreground mt-1 mb-4">
  You don&apos;t have any posts scheduled for publication
</p>
                        <Button 
                          variant="outline" 
                          onClick={() => setActiveTab('content-editor')}
                        >
                          Schedule a Post
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Schedule</CardTitle>
                <CardDescription>
                  Schedule your draft posts for publication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogPosts
                    .filter(post => post.status === 'draft')
                    .map(post => (
                      <div key={post.id} className="flex items-center justify-between p-4 border rounded-md">
                        <div>
                          <h4 className="font-medium">{post.title}</h4>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline">Draft</Badge>
                          </div>
                        </div>
                        <div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              // Open a date picker or modal for scheduling
                              const tomorrow = new Date();
                              tomorrow.setDate(tomorrow.getDate() + 1);
                              tomorrow.setHours(9, 0, 0, 0);
                              schedulePost(post.id, tomorrow.toISOString());
                            }}
                          >
                            Schedule
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                  {blogPosts.filter(post => post.status === 'draft').length === 0 && (
                    <div className="text-center py-8 border rounded-md">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium text-lg">No Draft Posts</h3>
                      <p className="text-muted-foreground mt-1 mb-4">
                        Create some draft posts first to schedule them
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab('content-generator')}
                      >
                        Create a Post
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
                <CardDescription>
                  Track how your blog posts are performing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-6 text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-lg">Analytics Dashboard Coming Soon</h3>
                 <p className="text-muted-foreground mt-1 mb-4 max-w-md mx-auto">
  We&apos;re working on a comprehensive analytics dashboard.
</p>
                  <Button variant="outline">Get Notified When Ready</Button>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-4">Published Posts Overview</h3>
                  <div className="space-y-4">
                    {blogPosts
                      .filter(post => post.status === 'published')
                      .map(post => (
                        <div key={post.id} className="p-4 border rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{post.title}</h4>
                              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                <Globe className="h-3 w-3 mr-1" />
                                <span>Published</span>
                              </div>
                            </div>
                            <Badge variant="outline">
                              Placeholder Stats
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mt-4">
                            <div className="text-center p-2 border rounded-md">
                              <p className="text-sm text-muted-foreground">Views</p>
                              <p className="font-medium">1,234</p>
                            </div>
                            <div className="text-center p-2 border rounded-md">
                              <p className="text-sm text-muted-foreground">Avg. Time</p>
                              <p className="font-medium">2:45</p>
                            </div>
                            <div className="text-center p-2 border rounded-md">
                              <p className="text-sm text-muted-foreground">Engagement</p>
                              <p className="font-medium">4.2%</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                    {blogPosts.filter(post => post.status === 'published').length === 0 && (
                      <div className="text-center py-8 border rounded-md">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-medium text-lg">No Published Posts</h3>
                        <p className="text-muted-foreground mt-1 mb-4">
                          Publish some posts to see their analytics here
                        </p>
                        <Button 
                          variant="outline" 
                          onClick={() => setActiveTab('content-editor')}
                        >
                          Go to Editor
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}