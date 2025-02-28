import type { SitemapUrlInput } from '#sitemap/types';
import axios from 'axios';

const fetchLinks = async () => {
  const publicSbUrl = useRuntimeConfig().public.publicSbUrl;
  const publicToken = useRuntimeConfig().public.contentDeliveryToken;
  const url = `${publicSbUrl}/links/?version=published&token=${publicToken}&per_page=500`;
  try {
    const { data } = await axios.get(url);
    const links = Object.values(data.links)
        .filter((link: any) => !link.is_folder && !link.real_path.includes('global'))
        .map((link: any) => link.real_path);
    return links;
  } catch (error) {
    console.error('Error fetching links:', error);
    return [];
  }
};

export default defineSitemapEventHandler(async () => {
  const links = await fetchLinks();
  return links satisfies SitemapUrlInput[]
})