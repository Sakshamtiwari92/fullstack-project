export interface Message {
  role: 'user' | 'model';
  text: string;
  image?: string; // Optional field for base64 image data URL
}
