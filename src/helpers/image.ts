export const preloadImages = (imageUrls: string[]) => {
  imageUrls.forEach((url: string) => {
    const img = new Image();
    img.src = url;
  });
};