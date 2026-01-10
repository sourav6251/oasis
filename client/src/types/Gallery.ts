export interface GalleryWork {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  duration: string;
  stylist: string;
}

export interface GalleryCategory {
  id: number;
  name: string;
  icon: string;
}

export interface Filter {
  id: string;
  name: string;
  icon: string;
}