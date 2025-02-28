<template>
  <div v-if="!loading" v-editable="blok" class="news">
    <div class="news__title--container">
      <h1 class="news__title ldtech" v-html="formatText(blok.title)" />
      <NuxtLink class="news__title--cta extrabold" to="/pagina-noticias">Ver todas</NuxtLink>
    </div>
    <div class="news__container" :class="`news__container--${news.length}`">
      <Card v-for="item in news" :key="item._uid" :item="item" class="news__item"/>
    </div>
  </div>
  <div v-else-if="loading" class="news__skeleton">
    <div class="skeleton news__skeleton--title" />
    <div class="news__skeleton--container">
      <div class="skeleton skeleton-card" />
      <div class="skeleton skeleton-card" />
      <div class="skeleton skeleton-card" />
      <div class="skeleton skeleton-card" />
    </div>
  </div>
</template>
  
<script setup>
import "./News.scss";
import Card from "../../src/components/Card/Card.vue";
import { formatText } from "~/src/helpers/text";
import { storyblokVersion } from "~/helpers/helpers";

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

const fetchStories = async () => {
  try {
    const { data } = await storyblokApi.get(`cdn/stories`, {
      starts_with: "noticias/",
      sort_by: 'created_at:desc',
      per_page: 4,
      version: storyblokVersion(),
    });

    data.stories.forEach((story) => {
      news.value.push({
        _uid: story.uuid,
        title: story.content.title,
        primaryText: story.content.primaryText,
        image: story.content.image,
        redirect: story.full_slug,
      });
    });
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

onMounted(async () => {
  await fetchStories();
});

</script>