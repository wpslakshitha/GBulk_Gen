// app/api/generate-images/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createCanvas, registerFont } from "canvas";
import path from "path";
import fs from "fs";

// Font paths (project root එකේ ඉඳන්)
const ISKOOLA_POTHA_PATH = path.join(
  process.cwd(),
  "public",
  "fonts",
  "Iskoola_Pota_Regular.ttf"
); // ඔයාගේ සිංහල font එකේ නම
const OPEN_SANS_PATH = path.join(
  process.cwd(),
  "public",
  "fonts",
  "OpenSans-Regular.ttf"
); // ඔයාගේ English font එකේ නම
const OPEN_SANS_BOLD_PATH = path.join(
  process.cwd(),
  "public",
  "fonts",
  "OpenSans-Bold.ttf"
);

// Register fonts (API route එක load වෙද්දී එක පාරක්)
try {
  if (fs.existsSync(ISKOOLA_POTHA_PATH)) {
    registerFont(ISKOOLA_POTHA_PATH, { family: "Iskoola Pota" });
  } else {
    console.warn("Sinhala font not found at:", ISKOOLA_POTHA_PATH);
  }
  if (fs.existsSync(OPEN_SANS_PATH)) {
    registerFont(OPEN_SANS_PATH, { family: "Open Sans", weight: "normal" });
  } else {
    console.warn("Open Sans Regular font not found at:", OPEN_SANS_PATH);
  }
  if (fs.existsSync(OPEN_SANS_BOLD_PATH)) {
    registerFont(OPEN_SANS_BOLD_PATH, { family: "Open Sans", weight: "bold" });
  } else {
    console.warn("Open Sans Bold font not found at:", OPEN_SANS_BOLD_PATH);
  }
} catch (error) {
  console.error("Error registering fonts:", error);
}

interface RequestBody {
  title: string;
  description: string;
  imageKeyword?: string;
  useImageBackground?: boolean;
  backgroundColor?: string;
  textColor?: string;
  titleFontSize?: string;
  descriptionFontSize?: string;
  addShadow?: boolean;
  overlayOpacity?: number;
  imageWidth?: number;
  imageHeight?: number;
}


// Helper function to check if text contains Sinhala characters
function isSinhala(text: string): boolean {
  // A simple check for common Sinhala Unicode range
  return /[\u0D80-\u0DFF]/.test(text);
}

// Predefined color palette
const COLOR_PALETTE = [
  "#F94144", "#F3722C", "#F8961E", "#F9C74F", "#90BE6D",
  "#43AA8B", "#4D908E", "#577590", "#277DA1", "#003049",
  "#d62828", "#f77f00", "#fcbf49", "#eae2b7", "#2a9d8f",
  "#e76f51", "#f4a261", "#e9c46a", "#264653", "#2b2d42"
];

function getRandomPaletteColor(): string {
  return COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
}

function wrapText(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  baseFont: string,
  isBold: boolean = false
) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;
  const fontWeight = isBold ? "bold " : "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    context.font = fontWeight + baseFont; // Set font for measurement
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, currentY);
  return currentY + lineHeight; // Return Y position after last line
}

async function fetchImageFromUnsplash(keyword: string): Promise<string | null> {
  const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  
  if (!UNSPLASH_ACCESS_KEY) {
    console.error("Unsplash Access Key is not set.");
    return null;
  }
  
  if (!keyword) {
    console.log("Image keyword is empty.");
    return null;
  }

  try {
    const randomPage = Math.floor(Math.random() * 100) + 1;
    const orientation = 'landscape';

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&per_page=1&page=${randomPage}&orientation=${orientation}&client_id=${UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Unsplash API error: ${response.status}`, errorData);
      return null;
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    } else {
      console.log(`No images found for keyword: "${keyword}" on page ${randomPage}.`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RequestBody;
    const {
      title,
      description,
      imageKeyword,
      useImageBackground = true,
      backgroundColor = getRandomPaletteColor(),
      textColor = "#FFFFFF",
      titleFontSize = "32px",
      descriptionFontSize = "20px",
      overlayOpacity = 0.7,
      imageWidth = 600,
      imageHeight = 600,
    } = body;

    // Create canvas
    const canvas = createCanvas(imageWidth, imageHeight);
    const ctx = canvas.getContext("2d");

    // Handle background (color or image)
    if (useImageBackground && imageKeyword) {
      // Try to fetch image from Unsplash
      const imageUrl = await fetchImageFromUnsplash(imageKeyword);
      
      if (imageUrl) {
        // Load the image and draw it as background
        const { loadImage } = await import('canvas');
        try {
          const image = await loadImage(imageUrl);
          ctx.drawImage(image, 0, 0, imageWidth, imageHeight);
        } catch (error) {
          console.error('Error loading background image:', error);
          // Fallback to color background
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, imageWidth, imageHeight);
        }
      } else {
        // Fallback to color background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, imageWidth, imageHeight);
      }
    } else {
      // Use color background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, imageWidth, imageHeight);
    }

    // Overlay
    ctx.fillStyle = `rgba(0, 0, 0, ${overlayOpacity})`;
    ctx.fillRect(0, 0, imageWidth, imageHeight);

    // Title
    const isSinhalaTitle = isSinhala(title);
    const titleFontFamily = isSinhalaTitle ? "Iskoola Pota" : "Open Sans";
    const titleSize = parseInt(titleFontSize);
    ctx.fillStyle = "#FFD700"; // Gold color for title
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Draw title
    const titleY = imageHeight * 0.35;
    const lastTitleY = wrapText(
      ctx,
      title || "No Title",
      imageWidth / 2,
      titleY,
      imageWidth * 0.8,
      titleSize * 1.2,
      `${titleSize}px "${titleFontFamily}"`,
      true
    );

    // Separator line
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(imageWidth / 2 - 30, lastTitleY + 10, 60, 3);

    // Description
    const isSinhalaDesc = isSinhala(description);
    const descFontFamily = isSinhalaDesc ? "Iskoola Pota" : "Open Sans";
    const descSize = parseInt(descriptionFontSize);
    ctx.fillStyle = textColor;
    
    // Draw description with quotation marks
    const descY = lastTitleY + 30;
    wrapText(
      ctx,
      `" ${description || ""} "`,
      imageWidth / 2,
      descY,
      imageWidth * 0.8,
      descSize * 1.2,
      `${descSize}px "${descFontFamily}"`
    );

    // Convert to base64
    const imageData = canvas.toDataURL("image/png");
    
    return NextResponse.json({ imageUrl: imageData });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}