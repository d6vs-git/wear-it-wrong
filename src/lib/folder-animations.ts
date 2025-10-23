// Animation data for style folder images
// Each folder has specific images with their initial (scattered) and final (hover) positions

export interface ImageAnimationData {
  id: number;
  filename: string;
  initial: {
    x: number;
    y: number;
    rotate: number;
    opacity: number;
    scale: number;
  };
  hover: {
    x: number;
    y: number;
    rotate: number;
    opacity: number;
    scale: number;
  };
}

export interface FolderAnimationData {
  [folderName: string]: ImageAnimationData[];
}

export const folderAnimations: FolderAnimationData = {
  brands: [
    {
      id: 1,
      filename: '1.png',
      initial: { x: 0, y: 0, rotate: -3, opacity: 0.8, scale: 0.85 },
      hover: { x: -145, y: -97, rotate: -18, opacity: 1, scale: 1 },
    },
    {
      id: 2,
      filename: '2.png',
      initial: { x: 0, y: 0, rotate: 4, opacity: 0.8, scale: 0.85 },
      hover: { x: -97, y: -116, rotate: 12, opacity: 1, scale: 1 },
    },
    {
      id: 3,
      filename: '3.png',
      initial: { x: 0, y: 0, rotate: -2, opacity: 0.8, scale: 0.85 },
      hover: { x: -48, y: -128, rotate: 5, opacity: 1, scale: 1 },
    },
    {
      id: 4,
      filename: '4.png',
      initial: { x: 0, y: 0, rotate: 3, opacity: 0.8, scale: 0.85 },
      hover: { x: 0, y: -133, rotate: -3, opacity: 1, scale: 1 },
    },
    {
      id: 5,
      filename: '5.png',
      initial: { x: 0, y: 0, rotate: -4, opacity: 0.8, scale: 0.85 },
      hover: { x: 48, y: -128, rotate: 16, opacity: 1, scale: 1 },
    },
    {
      id: 6,
      filename: '6.png',
      initial: { x: 0, y: 0, rotate: 2, opacity: 0.8, scale: 0.85 },
      hover: { x: 97, y: -116, rotate: -10, opacity: 1, scale: 1 },
    },
    {
      id: 7,
      filename: '7.png',
      initial: { x: 0, y: 0, rotate: -3, opacity: 0.8, scale: 0.85 },
      hover: { x: 145, y: -97, rotate: 14, opacity: 1, scale: 1 },
    },
    {
      id: 8,
      filename: '8.png',
      initial: { x: 0, y: 0, rotate: 4, opacity: 0.8, scale: 0.85 },
      hover: { x: -121, y: -67, rotate: -14, opacity: 1, scale: 1 },
    },
    {
      id: 9,
      filename: '9.png',
      initial: { x: 0, y: 0, rotate: -2, opacity: 0.8, scale: 0.85 },
      hover: { x: -73, y: -79, rotate: 10, opacity: 1, scale: 1 },
    },
    {
      id: 10,
      filename: '10.png',
      initial: { x: 0, y: 0, rotate: 3, opacity: 0.8, scale: 0.85 },
      hover: { x: -24, y: -85, rotate: -8, opacity: 1, scale: 1 },
    },
    {
      id: 11,
      filename: '11.png',
      initial: { x: 0, y: 0, rotate: -4, opacity: 0.8, scale: 0.85 },
      hover: { x: 73, y: -79, rotate: 12, opacity: 1, scale: 1 },
    },
    {
      id: 12,
      filename: '12.png',
      initial: { x: 0, y: 0, rotate: 2, opacity: 0.8, scale: 0.85 },
      hover: { x: 121, y: -67, rotate: -16, opacity: 1, scale: 1 },
    },
  ],
  people: [
    {
      id: 1,
      filename: '1.png',
      initial: { x: 0, y: 0, rotate: 3, opacity: 0.8, scale: 0.85 },
      hover: { x: -133, y: -103, rotate: -20, opacity: 1, scale: 1 },
    },
    {
      id: 2,
      filename: '2.png',
      initial: { x: 0, y: 0, rotate: -4, opacity: 0.8, scale: 0.85 },
      hover: { x: -79, y: -121, rotate: 14, opacity: 1, scale: 1 },
    },
    {
      id: 3,
      filename: '3.png',
      initial: { x: 0, y: 0, rotate: 2, opacity: 0.8, scale: 0.85 },
      hover: { x: -31, y: -131, rotate: -8, opacity: 1, scale: 1 },
    },
    {
      id: 4,
      filename: '4.png',
      initial: { x: 0, y: 0, rotate: -3, opacity: 0.8, scale: 0.85 },
      hover: { x: 31, y: -131, rotate: 16, opacity: 1, scale: 1 },
    },
    {
      id: 5,
      filename: '5.png',
      initial: { x: 0, y: 0, rotate: 4, opacity: 0.8, scale: 0.85 },
      hover: { x: 79, y: -121, rotate: -12, opacity: 1, scale: 1 },
    },
    {
      id: 6,
      filename: '6.png',
      initial: { x: 0, y: 0, rotate: -2, opacity: 0.8, scale: 0.85 },
      hover: { x: 133, y: -103, rotate: 10, opacity: 1, scale: 1 },
    },
    {
      id: 7,
      filename: '7.png',
      initial: { x: 0, y: 0, rotate: 3, opacity: 0.8, scale: 0.85 },
      hover: { x: -109, y: -73, rotate: -16, opacity: 1, scale: 1 },
    },
    {
      id: 8,
      filename: '8.png',
      initial: { x: 0, y: 0, rotate: -4, opacity: 0.8, scale: 0.85 },
      hover: { x: 0, y: -85, rotate: 12, opacity: 1, scale: 1 },
    },
    {
      id: 9,
      filename: '9.png',
      initial: { x: 0, y: 0, rotate: 2, opacity: 0.8, scale: 0.85 },
      hover: { x: 109, y: -73, rotate: -18, opacity: 1, scale: 1 },
    },
  ],
  spaces: [
    {
      id: 1,
      filename: '1.png',
      initial: { x: 0, y: 0, rotate: -4, opacity: 0.8, scale: 0.85 },
      hover: { x: -140, y: -99, rotate: -22, opacity: 1, scale: 1 },
    },
    {
      id: 2,
      filename: '2.png',
      initial: { x: 0, y: 0, rotate: 3, opacity: 0.8, scale: 0.85 },
      hover: { x: -91, y: -119, rotate: 15, opacity: 1, scale: 1 },
    },
    {
      id: 3,
      filename: '3.png',
      initial: { x: 0, y: 0, rotate: -2, opacity: 0.8, scale: 0.85 },
      hover: { x: -43, y: -129, rotate: 8, opacity: 1, scale: 1 },
    },
    {
      id: 4,
      filename: '4.png',
      initial: { x: 0, y: 0, rotate: 4, opacity: 0.8, scale: 0.85 },
      hover: { x: 43, y: -129, rotate: -10, opacity: 1, scale: 1 },
    },
    {
      id: 5,
      filename: '5.png',
      initial: { x: 0, y: 0, rotate: -3, opacity: 0.8, scale: 0.85 },
      hover: { x: 91, y: -119, rotate: 18, opacity: 1, scale: 1 },
    },
    {
      id: 6,
      filename: '6.png',
      initial: { x: 0, y: 0, rotate: 2, opacity: 0.8, scale: 0.85 },
      hover: { x: 140, y: -99, rotate: -14, opacity: 1, scale: 1 },
    },
    {
      id: 7,
      filename: '7.png',
      initial: { x: 0, y: 0, rotate: -4, opacity: 0.8, scale: 0.85 },
      hover: { x: -116, y: -70, rotate: 12, opacity: 1, scale: 1 },
    },
    {
      id: 8,
      filename: '8.png',
      initial: { x: 0, y: 0, rotate: 3, opacity: 0.8, scale: 0.85 },
      hover: { x: 0, y: -83, rotate: -16, opacity: 1, scale: 1 },
    },
    {
      id: 9,
      filename: '9.png',
      initial: { x: 0, y: 0, rotate: -2, opacity: 0.8, scale: 0.85 },
      hover: { x: 116, y: -70, rotate: 10, opacity: 1, scale: 1 },
    },
  ],
};

// Helper to get animation data for a specific folder
export const getFolderAnimations = (folderPath: string): ImageAnimationData[] => {
  return folderAnimations[folderPath] || [];
};
