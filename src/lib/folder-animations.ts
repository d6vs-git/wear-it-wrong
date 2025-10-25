// folder-animations.ts
export interface ImageAnimationData {
  id: number;
  filename: string;
  hover: {
    x: number;
    y: number;
    rotate: number;
    scale: number;
  };
}

export interface FolderAnimationData {
  [folderName: string]: ImageAnimationData[];
}

export const folderAnimations: FolderAnimationData = {
  brands: [
    // Back row - FLAT horizontal line, minimal Y variation
    {
      id: 1,
      filename: '1.png',
      hover: { x: -180, y: -135, rotate: -28, scale: 1 },
    },
    {
      id: 2,
      filename: '2.png',
      hover: { x: -120, y: -140, rotate: -20, scale: 1 },
    },
    {
      id: 3,
      filename: '3.png',
      hover: { x: -60, y: -145, rotate: -12, scale: 1 },
    },
    {
      id: 4,
      filename: '4.png',
      hover: { x: 0, y: -148, rotate: -2, scale: 1 },
    },
    {
      id: 5,
      filename: '5.png',
      hover: { x: 60, y: -145, rotate: 8, scale: 1 },
    },
    {
      id: 6,
      filename: '6.png',
      hover: { x: 120, y: -140, rotate: 18, scale: 1 },
    },
    {
      id: 7,
      filename: '7.png',
      hover: { x: 180, y: -135, rotate: 25, scale: 1 },
    },
    // Front row - FLAT horizontal line, lower
    {
      id: 8,
      filename: '8.png',
      hover: { x: -140, y: -85, rotate: -24, scale: 1 },
    },
    {
      id: 9,
      filename: '9.png',
      hover: { x: -70, y: -90, rotate: -16, scale: 1 },
    },
    {
      id: 10,
      filename: '10.png',
      hover: { x: 0, y: -92, rotate: -5, scale: 1 },
    },
    {
      id: 11,
      filename: '11.png',
      hover: { x: 70, y: -90, rotate: 12, scale: 1 },
    },
    {
      id: 12,
      filename: '12.png',
      hover: { x: 140, y: -85, rotate: 22, scale: 1 },
    },
  ],
  people: [
    // Back row - FLAT horizontal
    {
      id: 1,
      filename: '1.png',
      hover: { x: -170, y: -140, rotate: -26, scale: 1 },
    },
    {
      id: 2,
      filename: '2.png',
      hover: { x: -110, y: -145, rotate: -18, scale: 1 },
    },
    {
      id: 3,
      filename: '3.png',
      hover: { x: -50, y: -150, rotate: -10, scale: 1 },
    },
    {
      id: 4,
      filename: '4.png',
      hover: { x: 0, y: -152, rotate: 0, scale: 1 },
    },
    {
      id: 5,
      filename: '5.png',
      hover: { x: 50, y: -150, rotate: 10, scale: 1 },
    },
    {
      id: 6,
      filename: '6.png',
      hover: { x: 110, y: -145, rotate: 18, scale: 1 },
    },
    {
      id: 7,
      filename: '7.png',
      hover: { x: 170, y: -140, rotate: 26, scale: 1 },
    },
    // Front row - FLAT horizontal
    {
      id: 8,
      filename: '8.png',
      hover: { x: -130, y: -90, rotate: -22, scale: 1 },
    },
    {
      id: 9,
      filename: '9.png',
      hover: { x: 0, y: -95, rotate: 0, scale: 1 },
    },
   
  ],
  spaces: [
    // Back row - FLAT horizontal
    {
      id: 1,
      filename: '1.png',
      hover: { x: -165, y: -145, rotate: -25, scale: 1 },
    },
    {
      id: 2,
      filename: '2.png',
      hover: { x: -105, y: -150, rotate: -17, scale: 1 },
    },
    {
      id: 3,
      filename: '3.png',
      hover: { x: -45, y: -155, rotate: -9, scale: 1 },
    },
    {
      id: 4,
      filename: '4.png',
      hover: { x: 0, y: -158, rotate: 0, scale: 1 },
    },
    {
      id: 5,
      filename: '5.png',
      hover: { x: 45, y: -155, rotate: 9, scale: 1 },
    },
    {
      id: 6,
      filename: '6.png',
      hover: { x: 105, y: -150, rotate: 17, scale: 1 },
    },
    {
      id: 7,
      filename: '7.png',
      hover: { x: 165, y: -145, rotate: 25, scale: 1 },
    },
    // Front row - FLAT horizontal
    {
      id: 8,
      filename: '8.png',
      hover: { x: -125, y: -92, rotate: -21, scale: 1 },
    },
    {
      id: 9,
      filename: '9.png',
      hover: { x: 125, y: -92, rotate: 21, scale: 1 },
    },
  ],
};

export const getFolderAnimations = (folderPath: string): ImageAnimationData[] => {
  return folderAnimations[folderPath] || [];
};