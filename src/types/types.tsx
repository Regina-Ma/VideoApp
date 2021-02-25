export interface SearchProps {
  query: string;
  maxQuantity: number;
  maxDuration: number;
  foundQuantity: number;
}

interface Author {
  id: number;
  name: string;
  url: string;
}
interface File {
  id: number;
  quality: string;
  file_type: string;
  width: number;
  height: number;
  link: string;
}
interface Picture {
  id: number;
  picture: string;
  nr: number;
}

export interface VideoProps {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  full_res: null;
  tags: string[];
  duration: number;
  user: Author;
  video_files: Array<File>;
  video_pictures: Array<Picture>;
}

export interface VideoResponse {
  page: number;
  per_page: number;
  total_results: number;
  url: string;
  videos: Array<VideoProps>;
}
