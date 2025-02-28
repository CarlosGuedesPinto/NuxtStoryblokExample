<template>
  <div v-if="!loading" v-editable="blok" class="news-gallery">
    <Pagination :currentPage="currentPage" :totalPages="totalPages" :hasNextPage="hasNextPage" @key="currentPage" @pageChange="changePage"/>
    <div class="news-gallery__container">
      <Card v-for="item in news" :key="item._uid" :item="item" class="news__item"/>
    </div>
    <Pagination :currentPage="currentPage" :totalPages="totalPages" :hasNextPage="hasNextPage" @key="currentPage" @pageChange="changePage"/>
  </div>
  <div v-else-if="loading" class="news-gallery__skeleton">
    <div class="news-gallery__skeleton--container">
      <div v-for="skeleton in 12" class="skeleton skeleton-card" />
    </div>
  </div>
</template>
  
<script setup>
import "./NewsGallery.scss";
import Card from "../../src/components/Card/Card.vue";
import { storyblokVersion } from "~/helpers/helpers";
import Pagination from "./components/Pagination.vue";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

defineComponent({
  components: {
    Card,
  },
});

const storyblokApi = useStoryblokApi();
const loading = ref(true);
const news = ref([]);
const currentPage = ref(1);
const hasNextPage = ref(false);
const totalPages = ref(1);

const fetchStories = async (previousPage = 0) => {
  loading.value = true;
  try {
    const { data } = await storyblokApi.get(`cdn/stories`, {
      starts_with: "noticias/",
      sort_by: 'created_at:desc',
      per_page: 12,
      page: currentPage.value,
      version: storyblokVersion(),
    });

    news.value = data.stories.map((story) => ({
      _uid: story.uuid,
      title: story.content.title,
      primaryText: story.content.primaryText,
      image: story.content.image,
      redirect: story.full_slug,
    }));

    const { data: nextPageData } = await storyblokApi.get(`cdn/stories`, {
      starts_with: "noticias/",
      sort_by: 'created_at:desc',
      per_page: 12,
      page: currentPage.value + 1,
      version: storyblokVersion(),
    });

    hasNextPage.value = nextPageData.stories.length > 0;

    if (hasNextPage.value) {
      totalPages.value = currentPage.value + 1;
    }
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);

    throw createError({
      statusCode: 404,
      statusMessage:
        storyblokVersion() === "draft"
          ? "Storyblok - Erro ao buscar notícias"
          : "Ups! Algo deu errado",
      fatal: true,
    });
  } finally {
    loading.value = false;
  }
};

const changePage = async (page) => {
  if (page === 'last') {
    await goToLastPage();
  } else {
    currentPage.value = page;
    news.value = [];
    loading.value = true;

    await fetchStories(page);
  }
};

const goToLastPage = async () => {
  loading.value = true;
  let page = currentPage.value;

  while (true) {
    page += 1;
    try {
      const { data } = await storyblokApi.get(`cdn/stories`, {
        starts_with: "noticias/",
        sort_by: 'created_at:desc',
        per_page: 12,
        page: page,
        version: storyblokVersion(),
      });

      if (data.stories.length < 12) {
        news.value = data.stories.map((story) => ({
          _uid: story.uuid,
          title: story.content.title,
          primaryText: story.content.primaryText,
          image: story.content.image,
          redirect: story.full_slug,
        }));

        break;
      }
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);

      throw createError({
        statusCode: 404,
        statusMessage:
          storyblokVersion() === "draft"
            ? "Storyblok - Erro ao buscar notícias"
            : "Ups! Algo deu errado",
        fatal: true,
      });
    } finally {
      loading.value = false;
    }
  }

  currentPage.value = page;
  hasNextPage.value = false;
};

onMounted(async () => {
  await Promise.all[fetchStories()];
});

</script>