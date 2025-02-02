export type TUser = {
  favorite_list: any;
  current_package_info: any;
  logo: string | undefined;
  actor_type: string;
  bio: string;
  city: number;
  city_name: string;
  country: number;
  country_name: string;
  cover: string;
  dashboard_link: string;
  email: string;
  first_name: string;
  has_package: string;
  id: number;
  image: string;
  last_name: string;
  phone: string;
  my_props: any[];
  offers: any[];
};

export type BrokerPropertiesDetails = {
  address?: string;
  amenities?: {
    id?: number;
    amenities?: number;
    created_at?: string;
    property_id?: number;
  }[];
  bath_room_no?: number;
  bed_rooms_no?: number;
  broker_details?: {
    broker_type: string;
    description: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    logo: string;
    name: string;
    phone: string;
    src: string;
  }[];
  category?: string;
  city?: string;
  country?: string;
  created_at?: string;
  currency?: string;
  description?: string;
  facebook?: string;
  for_what?: string;
  google_plus?: string;
  id?: number;
  is_fav?: string;
  land_area?: number;
  listing_number?: string;
  normal_featured?: string;
  primary_image?: string;
  property_type?: string;
  region?: string;
  rent_duration?: string;
  rent_price?: number;
  room_ensuite?: number;
  sale_price?: number;
  title?: string;
  twitter?: string;
  updated_at?: string;
  youtube?: string;
}[];

export type TBrokerDetails = {
  id: number;
  broker_type?: string;
  description?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  logo?: string;
  name?: string;
  offers?: any[];
  phone?: string;
  src?: string;
  submitted_props?: BrokerPropertiesDetails;
};

export type TProjectDetails = {
  agent_data: {
    broker_type: string;
    description: string;
    email: string;
    id: number;
    logo: string;
    name: string;
    phone: string;
    projects_count: number;
    properties_count: number;
  }[];
  bedrooms: string;
  city: string;
  country: string;
  created_at: string;
  delivery_date: string;
  description: string;
  facebook: string;
  google_plus: string;
  id: number;
  image: string;
  listing_number: string;
  price_from: string;
  region: string;
  title: string;
  total_units: string;
  twitter: string;
};

export type TADSHome = {
  id: number;
  image: string;
  url: string;
  type: string;
  iframe: null;
};
