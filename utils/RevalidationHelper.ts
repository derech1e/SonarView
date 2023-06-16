export function revalidateTag(tag: string) {
    return fetch(`/api/revalidate?tag=${tag}`);
}