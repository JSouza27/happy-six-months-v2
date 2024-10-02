export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type Meta = {
  pagination: Pagination;
};

export type Formats = {
  large: Large;
  small: Large;
  medium: Large;
  thumbnail: Large;
};

export type Attributes = {
  name: string;
  alternativeText?: any;
  caption?: any;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
};

export type Large = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: any;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

export type Images = {
  data?: Attributes;
};

export type Cover = {
  data: {
    id: number;
    attributes: Attributes;
  };
};

export type Album = {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    title: string;
    location: string;
    playlist: string;
    images: Images;
    cover: Cover;
  };
};

export type AlbumResponse = {
  data: Album[];
  meta: Meta;
};
