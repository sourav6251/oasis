export interface BlogImage {
  url: string
  fileId: string
  _id?: string
}

export interface BlogData {
  _id: string
  id?: string | number
  images: BlogImage[]
  // Keep single image for backward compat with sample data
  image?: string
  writer: string
  writerName?: string
  publishDate: string
  title: string
  content: string
}
