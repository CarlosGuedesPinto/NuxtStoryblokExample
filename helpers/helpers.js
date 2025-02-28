export function storyblokVersion() {
    const config = useRuntimeConfig();
    const { $preview } = useNuxtApp();
    const version = $preview ? "draft" : "published";
    return config.public.NUXT_PUBLIC_SB_ENV === "development" ? "draft" : version;
}