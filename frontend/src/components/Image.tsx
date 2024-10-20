interface ImageComponentProps {
    url: string;
}

function ImageComponent({ url }: ImageComponentProps) {
  return (
    <div>
      <h1>Image from URL</h1>
      <img src={url} alt="Description" style={{ width: '300px', height: 'auto' }} />
    </div>
  );
};

export default ImageComponent;
