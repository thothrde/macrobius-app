export default function myImageLoader({ src }) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${src}`;
}