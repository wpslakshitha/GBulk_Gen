'use client'
import React, { useState, useRef, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  PlusCircle, 
  ImageIcon, 
  RefreshCw, 
  Download, 
  Loader2, 
  Settings, 
  LayoutGrid,
  Copy
} from 'lucide-react';
import PostInputForm from '@/components/tools/image-gen/PostInputForm';

// const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

// PostData interface
interface PostData {
  id: string;
  title: string;
  description: string;
  imageKeyword: string;
  useImageBackground: boolean;
  backgroundColor: string;
  fontFamily?: string;
  fontSize?: string;
  textColor?: string;
  addShadow?: boolean;
  overlayOpacity?: number;
  titleFontSize?: string;
  descriptionFontSize?: string;
}


// GeneratedImage interface
interface GeneratedImage {
  id: string;
  url: string;
  isRefreshing?: boolean;
}

const Home = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const generatorRef = useRef<HTMLDivElement>(null);

  // Add post function
  const addPost = useCallback(() => {
    const newPost: PostData = {
      id: Date.now().toString(),
      title: '',
      description: '',
      imageKeyword: '',
      useImageBackground: true,
      backgroundColor: '#ffffff',
      fontFamily: 'sans-serif',
      fontSize: '24px',
      textColor: '#ffffff',
      addShadow: true,
      overlayOpacity: 0.5,
      titleFontSize: '32px',
      descriptionFontSize: '16px',
    };
    setPosts(currentPosts => [...currentPosts, newPost]);
  }, []);

  // Update post function
  const updatePost = useCallback((id: string, updatedData: Partial<PostData>) => {
    setPosts(currentPosts =>
      currentPosts.map((post) =>
        post.id === id ? { ...post, ...updatedData } : post
      )
    );
    setGeneratedImages(currentImages => currentImages.filter(img => img.id !== id));
  }, []);

  // Remove post function
  const removePost = useCallback((id: string) => {
    setPosts(currentPosts => currentPosts.filter((post) => post.id !== id));
    setGeneratedImages(currentImages => currentImages.filter(img => img.id !== id));
  }, []);

  // Generate light color
  // const generateLightColor = (): string => {
  //   const hue = Math.floor(Math.random() * 360);
  //   const saturation = Math.floor(Math.random() * 30) + 60;
  //   const lightness = Math.floor(Math.random() * 20) + 70;
  //   return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  // };

  // Fetch image from Unsplash
  // const fetchImageFromUnsplash = async (keyword: string): Promise<string | null> => {
  //   // ... existing fetchImageFromUnsplash code ...
  //   if (!UNSPLASH_ACCESS_KEY) {
  //       console.error("Unsplash Access Key is not set.");
  //       return null;
  //   }
  //   if (!keyword) {
  //       console.log("Image keyword is empty.");
  //       return null;
  //   }

  //   try {
  //       const randomPage = Math.floor(Math.random() * 100) + 1;
  //       const orientation = 'landscape';

  //       const response = await fetch(
  //           `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&per_page=1&page=${randomPage}&orientation=${orientation}&client_id=${UNSPLASH_ACCESS_KEY}`
  //       );

  //       if (!response.ok) {
  //           const errorData = await response.json();
  //           console.error(`Unsplash API error: ${response.status}`, errorData);
  //            if (response.status === 403) {
  //                console.error("Unsplash Rate Limit Exceeded or API Key Invalid.");
  //            }
  //           return null;
  //       }

  //       const data = await response.json();

  //       if (data.results && data.results.length > 0) {
  //           return data.results[0].urls.regular;
  //       } else {
  //           console.log(`No images found for keyword: "${keyword}" on page ${randomPage}.`);
  //           return null;
  //       }

  //   } catch (error) {
  //       console.error('Error fetching image from Unsplash:', error);
  //       return null;
  //   }
  // };

  // Generate post image content
  // const generatePostImageContent = async (post: PostData): Promise<{ backgroundStyle: string, textHtml: string } | null> => {
  //   // ... existing generatePostImageContent code ...
  //   let backgroundStyle = '';
  //   let finalImageUrl = null;

  //   if (post.useImageBackground && post.imageKeyword) {
  //     finalImageUrl = await fetchImageFromUnsplash(post.imageKeyword);

  //     if (finalImageUrl) {
  //       const cacheBustedImageUrl = `${finalImageUrl}&cachebuster=${Date.now()}`;
  //       backgroundStyle = `background-image: url('${cacheBustedImageUrl}'); background-size: cover; background-position: center;`;
  //       console.log(`Using image for post ${post.id}: ${cacheBustedImageUrl}`);
  //     } else {
  //        backgroundStyle = `background-color: ${generateLightColor()};`;
  //        console.warn(`Failed to fetch image for keyword "${post.imageKeyword}". Using random color for post ${post.id}.`);
  //     }
  //   } else if (!post.useImageBackground && post.backgroundColor) {
  //     backgroundStyle = `background-color: ${post.backgroundColor};`;
  //      console.log(`Using selected color for post ${post.id}: ${post.backgroundColor}`);
  //   } else {
  //     backgroundStyle = `background-color: ${generateLightColor()};`;
  //     console.log(`Using random color for post ${post.id}: ${backgroundStyle}`);
  //   }

  //   const overlayStyle = `
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     width: 100%;
  //     height: 100%;
  //     background-color: rgba(0, 0, 0, ${post.overlayOpacity !== undefined ? post.overlayOpacity : 0.7});
  //     z-index: 0;
  //   `;

  //   // Text styling
  //   const textStyle = `
  //     color: ${post.textColor || '#ffffff'};
  //     font-family: ${post.fontFamily || 'Iskoola Pota, sans-serif'};
  //     font-size: ${post.fontSize || '24px'};
  //     text-align: center;
  //     padding: 20px;
  //     ${post.addShadow ? 'text-shadow: 2px 2px 4px rgba(0,0,0,0.5);' : ''}
  //     position: absolute;
  //     top: 50%;
  //     left: 50%;
  //     transform: translate(-50%, -50%);
  //     width: 90%;
  //     box-sizing: border-box;
  //     z-index: 1;
  //     line-height: 1.5;
  //   `;

  //   const titleFontSize = post.titleFontSize || '32px';
  //   const descriptionFontSize = post.descriptionFontSize || '20px';

  //   const innerHtml = `
  //     <div style="${overlayStyle}"></div>
  //     <div style="${textStyle}">
  //       <h2 style="margin: 0; padding: 0; font-size: ${titleFontSize}; word-break: break-word; color: #FFD700;">${post.title || ''}</h2>
  //       <div style="width: 60px; height: 3px; background-color: #FFD700; margin: 15px auto;"></div>
  //       <p style="margin: 10px 0 0 0; padding: 0; font-size: ${descriptionFontSize}; word-break: break-word; font-weight: 500;">
  //         " ${post.description || ''} "
  //       </p>
  //     </div>
  //   `;

  //   return { backgroundStyle, textHtml: innerHtml };
  // };

// Update the generateAndReturnImageUrl function
// Update the generateAndReturnImageUrl function
const generateAndReturnImageUrl = async (post: PostData): Promise<string | null> => {
  try {
    // Call the server-side API instead of generating client-side
    const response = await fetch('/api/generate-images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: post.title,
        description: post.description,
        imageKeyword: post.imageKeyword,
        useImageBackground: post.useImageBackground,
        backgroundColor: post.backgroundColor,
        textColor: post.textColor,
        titleFontSize: post.titleFontSize,
        descriptionFontSize: post.descriptionFontSize,
        addShadow: post.addShadow,
        overlayOpacity: post.overlayOpacity,
        imageWidth: 600,
        imageHeight: 600,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
};

  // Handle generate posts
  const handleGeneratePosts = async () => {
    setIsGenerating(true);
    setGeneratedImages([]);
    
    const generated: GeneratedImage[] = [];

    for (const post of posts) {
      const dataUrl = await generateAndReturnImageUrl(post);
      if (dataUrl) {
        generated.push({ id: post.id, url: dataUrl, isRefreshing: false });
      }
    }

    setGeneratedImages(generated);
    setIsGenerating(false);
    
    // Switch to gallery tab after generation
    if (generated.length > 0) {
      setActiveTab('gallery');
    }
  };

  // Handle refresh post
  const handleRefreshPost = async (postId: string) => {
    // ... existing handleRefreshPost code ...
    setGeneratedImages(currentImages =>
        currentImages.map(img =>
            img.id === postId ? { ...img, isRefreshing: true } : img
        )
    );

    const postToRefresh = posts.find(post => post.id === postId);

    if (postToRefresh) {
        const newDataUrl = await generateAndReturnImageUrl(postToRefresh);

        setGeneratedImages(currentImages =>
            currentImages.map(img =>
                img.id === postId ? { ...img, url: newDataUrl || img.url, isRefreshing: false } : img
            )
        );
    } else {
        console.error(`Post with ID ${postId} not found for refreshing.`);
         setGeneratedImages(currentImages =>
             currentImages.map(img =>
                 img.id === postId ? { ...img, isRefreshing: false } : img
             )
         );
    }
  };

  return (
     <div className="h-full flex flex-col">


<div ref={generatorRef} style={{ position: 'fixed', top: '-9999px', left: '-9999px', width: '600px', height: '400px', overflow: 'hidden', pointerEvents: 'none' }} />
    <div className="flex-1 container mx-auto p-4 max-w-7xl">
      <header className="py-4">
                 <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">
              Social Media Image Generator
            </h1>
            <p className="text-muted-foreground mt-1">
              Create stunning social media posts with custom backgrounds, text, and styling.
              </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Settings size={16} />
            Settings
          </Button>
        </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="editor" className="flex items-center gap-2">
                <Settings size={16} />
                Editor
              </TabsTrigger>
              <TabsTrigger value="gallery" className="flex items-center gap-2">
                <LayoutGrid size={16} />
                Gallery
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">Post Editor</h2>
                <Button 
                  onClick={addPost} 
                  variant="default" 
                  size="sm" 
                  className="gap-2"
                  disabled={isGenerating}
                >
                  <PlusCircle size={16} />
                  Add New Post
                </Button>
              </div>
              
              <ScrollArea className="h-[calc(100vh-280px)] pr-4">
                {posts.length === 0 ? (
                  <Card className="border-dashed border-2 p-8">
                    <CardContent className="flex flex-col items-center justify-center text-center pt-6">
                      <ImageIcon size={48} className="text-slate-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Posts Added Yet</h3>
                      <p className="text-slate-500 mb-4">Create your first post by clicking the Add New Post button above.</p>
                      <Button onClick={addPost} variant="outline" size="sm" className="gap-2">
                        <PlusCircle size={16} />
                        Add Your First Post
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {posts.map((post) => (
                      <PostInputForm
                        key={post.id}
                        postData={post}
                        onUpdate={(updatedData) => updatePost(post.id, updatedData)}
                        onRemove={() => removePost(post.id)}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>
              
              {posts.length > 0 && (
                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={handleGeneratePosts}
                    disabled={isGenerating || posts.length === 0}
                    className="gap-2 px-8"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <ImageIcon size={18} />
                        Generate Posts
                      </>
                    )}
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="gallery" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-800">Generated Posts</h2>
                {generatedImages.length > 0 && (
                  <Button 
                    onClick={() => setActiveTab('editor')} 
                    variant="outline" 
                    size="sm"
                  >
                    Back to Editor
                  </Button>
                )}
              </div>
              
              {generatedImages.length === 0 ? (
                <Card className="border-dashed border-2 p-8">
                  <CardContent className="flex flex-col items-center justify-center text-center pt-6">
                    <ImageIcon size={48} className="text-slate-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Generated Posts Yet</h3>
                    <p className="text-slate-500 mb-4">Create and generate posts in the Editor tab to see them here.</p>
                    <Button onClick={() => setActiveTab('editor')} variant="outline" size="sm">
                      Go to Editor
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {generatedImages.map((img) => (
                    <Card key={img.id} className="overflow-hidden">
                      <div className="relative aspect-[3/2] bg-slate-100">
                        {img.isRefreshing && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 text-white">
                            <Loader2 size={24} className="animate-spin mr-2" />
                            <span>Refreshing...</span>
                          </div>
                        )}
                        {img.url ? (
                          <img 
                            src={img.url} 
                            alt={`Generated Post ${img.id}`} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-200">
                            <span className="text-slate-500">Generation Failed</span>
                          </div>
                        )}
                      </div>
                      
                                           <div className="">
                        <div className=" text-center flex gap-2 justify-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRefreshPost(img.id)}
                            disabled={img.isRefreshing}
                          >
                            <RefreshCw size={16} className={img.isRefreshing ? "animate-spin h-3 w-3 mr-1" : "h-3 w-3 mr-1"} />
                            Refresh
                          </Button>
                          
                          {img.url && (
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                            >
                              <a
                                href={img.url}
                                download={`social-post-${img.id}.png`}
                                onClick={(e) => img.isRefreshing && e.preventDefault()}
                              >
                                <Download size={16} className="h-3 w-3 mr-1" />
                                Download
                              </a>
                            </Button>
                          )}
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Find the post title for this image
                              const post = posts.find(p => p.id === img.id);
                              if (post && post.title) {
                                navigator.clipboard.writeText(post.title);
                                // Optional: Add a toast notification here
                              }
                            }}
                          >
                            <Copy className="h-3 w-3 mr-1" /> Title
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </header>
      </div>
    </div>
  );
};

export default Home;