interface Product {
  id: number;
  price: number;
  name: string;
  thumbnail: string;
  new: any;
  sale: any;
}

interface User {
  email: string;
  password: string;
}

interface category {
  id_category: number;
  name_category: string;
}

interface product {
  id_product: number;
  name_category: string;
  name: string;
  price: string;
  id_image: string;
  quantity: string;
  outstanding: boolean | number;
  description: string;
  thumbnail: string;
  sale: boolean;
}

interface user {
  id_user: number;
  email: string;
  username: string;
  admin: string;
}

interface cart {
  quantityCart: number;
}

interface Image {
  id_image: number;
  id_product: number;
  path: string;
}

interface Contact {
  id_contact: number;
  email: string;
  subject: string;
  message: string;
}
