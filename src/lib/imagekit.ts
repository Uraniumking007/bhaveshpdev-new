import ImageKit from "imagekit";

export const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export const getImageKitSignature = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const token = imagekit.getAuthenticationParameters(timestamp);
  return {
    signature: token.signature,
    token: token.token,
    expire: token.expire,
    timestamp: timestamp,
  };
};
