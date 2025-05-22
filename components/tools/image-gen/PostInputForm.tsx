'use client'
import React from 'react';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { TextCursorInput, Trash2, Type, Sliders, Droplets, SquareChevronDown, Image } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Switch } from '../../ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Separator } from '../../ui/separator';

// Parent component එකෙන් එන props වල types
interface PostInputFormProps {
  postData: { // PostData object එකේ structure එක
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
  };
  onUpdate: (updatedData: Partial<PostData>) => void;
  onRemove: () => void;
}

// PostData interface එක (page එකෙන් import කරන්න පුළුවන්, නැත්නම් මෙතන define කරන්න)
// අපි clarity එකට මෙතනත් තියමු
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


 

// Component එක
const PostInputForm: React.FC<PostInputFormProps> = ({ postData, onUpdate, onRemove }) => {

  // Font Family Options ටික (Google Fonts එකතු කරමු)
  // Note: මේ Fonts Global CSS වලින් Load කරලා තියෙන්න ඕනේ
  const fontOptions = [
    { label: 'Sans Serif (Default)', value: 'sans-serif' },
    { label: 'Serif', value: 'serif' },
    { label: 'Monospace', value: 'monospace' },
    { label: 'Arial', value: 'Arial, sans-serif' },
    { label: 'Iskoola Pota', value: 'Iskoola Pota, sans-serif' }, // Sinhala Font
    { label: 'Georgia', value: 'Georgia, serif' },
    { label: 'Roboto', value: 'Roboto, sans-serif' }, // Example Google Font
    { label: 'Open Sans', value: 'Open Sans, sans-serif' }, // Example Google Font
    { label: 'Lato', value: 'Lato, sans-serif' }, // Example Google Font
    { label: 'Montserrat', value: 'Montserrat, sans-serif' }, // Example Google Font
    { label: 'Source Sans Pro', value: 'Source Sans Pro, sans-serif' }, // Example Google Font
  ];

  // Font Size Options ටික
  const fontSizeOptions = [
    { label: 'Small (16px)', value: '16px' },
    { label: 'Medium (24px)', value: '24px' },
    { label: 'Large (36px)', value: '36px' },
    { label: 'Extra Large (48px)', value: '48px' },
    { label: 'XXL (64px)', value: '64px' },
  ];

  // Title Font Size Options
  const titleFontSizeOptions = [
    { label: 'Small (18px)', value: '18px' },
    { label: 'Medium (24px)', value: '24px' },
    { label: 'Large (32px)', value: '32px' },
    { label: 'Extra Large (42px)', value: '42px' },
  ];

  // Description Font Size Options
  const descriptionFontSizeOptions = [
    { label: 'Small (14px)', value: '14px' },
    { label: 'Medium (16px)', value: '16px' },
    { label: 'Large (20px)', value: '20px' },
    { label: 'Extra Large (24px)', value: '24px' },
  ];

  // Handle overlay opacity change
  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onUpdate({ overlayOpacity: value });
  };


  return (
    <Card className="mb-6 overflow-hidden border-0 shadow-md">
      <CardHeader className=" pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <TextCursorInput size={18} className="text-primary" />
            Post Content
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onRemove} 
                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove this post</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      
      <CardContent className="p-5">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Type size={14} /> Content
            </TabsTrigger>
            <TabsTrigger value="styling" className="flex items-center gap-2">
              <Sliders size={14} /> Styling
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor={`title-${postData.id}`} className="text-sm font-medium">
                  Title
                </Label>
                <Input
                  type="text"
                  id={`title-${postData.id}`}
                  className="mt-1.5"
                  value={postData.title}
                  onChange={(e) => onUpdate({ title: e.target.value })}
                  placeholder="Enter post title"
                />
              </div>
              
              <div>
                <Label htmlFor={`description-${postData.id}`} className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id={`description-${postData.id}`}
                  rows={3}
                  className="mt-1.5 resize-none"
                  value={postData.description}
                  onChange={(e) => onUpdate({ description: e.target.value })}
                  placeholder="Enter post description"
                />
              </div>
              
              <div className="pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`useImageBackground-${postData.id}`} className="text-sm font-medium cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Image size={16} className="text-primary" />
                      Use Image Background
                    </div>
                  </Label>
                  <Switch
                    id={`useImageBackground-${postData.id}`}
                    checked={postData.useImageBackground}
                    onCheckedChange={(checked) => onUpdate({ useImageBackground: checked })}
                  />
                </div>
                
                {postData.useImageBackground ? (
                  <div className="mt-3">
                    <Label htmlFor={`imageKeyword-${postData.id}`} className="text-xs text-muted-foreground">
                      Image Keyword
                    </Label>
                    <Input
                      type="text"
                      id={`imageKeyword-${postData.id}`}
                      className="mt-1"
                      value={postData.imageKeyword}
                      onChange={(e) => onUpdate({ imageKeyword: e.target.value })}
                      placeholder="e.g., nature, city, abstract"
                    />
                  </div>
                ) : (
                  <div className="mt-3">
                    <Label htmlFor={`backgroundColor-${postData.id}`} className="text-xs text-muted-foreground">
                      Background Color
                    </Label>
                    <div className="flex items-center gap-3 mt-1">
                      <Input
                        type="color"
                        id={`backgroundColor-${postData.id}`}
                        className="w-12 h-8 p-1 cursor-pointer"
                        value={postData.backgroundColor}
                        onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
                      />
                      <span className="text-sm text-muted-foreground">{postData.backgroundColor}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="styling" className="space-y-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <div>
                <Label htmlFor={`fontFamily-${postData.id}`} className="text-sm font-medium flex items-center gap-1.5">
                  <Type size={14} className="text-primary" /> Font Family
                </Label>
                <Select 
                  value={postData.fontFamily || 'sans-serif'} 
                  onValueChange={(value) => onUpdate({ fontFamily: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select font family" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor={`fontSize-${postData.id}`} className="text-sm font-medium flex items-center gap-1.5">
                  <TextCursorInput size={14} className="text-primary" /> Font Size
                </Label>
                <Select 
                  value={postData.fontSize || '24px'} 
                  onValueChange={(value) => onUpdate({ fontSize: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontSizeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor={`titleFontSize-${postData.id}`} className="text-sm font-medium flex items-center gap-1.5">
                  <Type size={14} className="text-primary" /> Title Size
                </Label>
                <Select 
                  value={postData.titleFontSize || '32px'} 
                  onValueChange={(value) => onUpdate({ titleFontSize: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select title size" />
                  </SelectTrigger>
                  <SelectContent>
                    {titleFontSizeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor={`descriptionFontSize-${postData.id}`} className="text-sm font-medium flex items-center gap-1.5">
                  <Type size={14} className="text-primary" /> Description Size
                </Label>
                <Select 
                  value={postData.descriptionFontSize || '16px'} 
                  onValueChange={(value) => onUpdate({ descriptionFontSize: value })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select description size" />
                  </SelectTrigger>
                  <SelectContent>
                    {descriptionFontSizeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor={`textColor-${postData.id}`} className="text-sm font-medium flex items-center gap-1.5">
                  <Droplets size={14} className="text-primary" /> Text Color
                </Label>
                <div className="flex items-center gap-3 mt-1.5">
                  <Input
                    type="color"
                    id={`textColor-${postData.id}`}
                    className="w-12 h-8 p-1 cursor-pointer"
                    value={postData.textColor || '#000000'}
                    onChange={(e) => onUpdate({ textColor: e.target.value })}
                  />
                  <span className="text-sm text-muted-foreground">{postData.textColor || '#000000'}</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex items-center justify-between w-full">
                  <Label htmlFor={`addShadow-${postData.id}`} className="text-sm font-medium cursor-pointer flex items-center gap-1.5">
                    <SquareChevronDown size={14} className="text-primary" /> Text Shadow
                  </Label>
                  <Switch
                    id={`addShadow-${postData.id}`}
                    checked={postData.addShadow || false}
                    onCheckedChange={(checked) => onUpdate({ addShadow: checked })}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <Label htmlFor={`overlayOpacity-${postData.id}`} className="text-sm font-medium flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Droplets size={14} className="text-primary" /> Overlay Opacity
                </div>
                <span className="text-xs text-muted-foreground">{postData.overlayOpacity !== undefined ? (postData.overlayOpacity * 100).toFixed(0) : '50'}%</span>
              </Label>
              <Input
                type="range"
                id={`overlayOpacity-${postData.id}`}
                className="mt-1.5"
                min="0"
                max="1"
                step="0.05"
                value={postData.overlayOpacity !== undefined ? postData.overlayOpacity : 0.5}
                onChange={handleOpacityChange}
              />
            </div>
            
            <Separator className="my-4" />
            
            <div className="bg-slate-50 p-3 rounded-md">
              <p className="text-xs text-muted-foreground">Preview your styling changes here. The actual appearance may vary slightly in the final output.</p>
              <div 
                className="mt-2 p-3 rounded border flex flex-col items-center justify-center"
                style={{
                  backgroundColor: !postData.useImageBackground ? postData.backgroundColor : '#f1f5f9',
                  fontFamily: postData.fontFamily || 'sans-serif',
                  color: postData.textColor || '#000000',
                  textShadow: postData.addShadow ? '1px 1px 3px rgba(0,0,0,0.3)' : 'none',
                  height: '150px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {postData.useImageBackground && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: `rgba(0,0,0,${postData.overlayOpacity !== undefined ? postData.overlayOpacity : 0.5})`,
                    zIndex: 1
                  }}></div>
                )}
                <div style={{ zIndex: 2, position: 'relative' }}>
                  <div style={{ fontSize: postData.titleFontSize || '32px' }}>
                    {postData.title || 'Title Preview'}
                  </div>
                  <div style={{ fontSize: postData.descriptionFontSize || '16px', marginTop: '8px' }}>
                    {postData.description || 'Description preview'}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PostInputForm;