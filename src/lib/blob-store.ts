import { put, del } from "@vercel/blob";

export async function putImage(file: File) {
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const pathname = `images/${crypto.randomUUID()}.${ext}`;
  const { url } = await put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type || undefined,
  });
  return url;
}

export async function deleteBlob(urlOrPathname: string) {
  await del(urlOrPathname);
}
