import Image from 'next/image';

export default function CustomImage({ src, alt, ...otherProps }) {
  return (
    <figure className="relative w-full h-auto">
      <Image
        className="object-cover object-top w-full h-auto"
        src={src}
        alt={alt || ''}
        fill={true}
        {...otherProps}
      />
    </figure>
  );
}
