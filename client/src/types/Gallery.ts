export interface GalleryWork {
  _id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  duration: string;
  stylist: string;
}

export interface GalleryCategory {
  _id: string;
  name: string;
  icon: string;
}

export interface Filter {
  id: string;
  name: string;
  icon: string;
  _id?: string;
}