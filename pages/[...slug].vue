<template>
  <div v-if="story && !loading">
    <div v-if="story.content.topbar?.length > 0">
      <StoryblokComponent
        :blok="story.content.topbar[0].reference[0].content"
        :primary-complementary-image="story.content.complementaryImagePrimary"
        :secondary-complementary-image="story.content.complementaryImageSecondary"
        :loading="loading"
      />
    </div>
    <div class="slug__content">
      <StoryblokComponent :blok="story.content" :loading="loading" />
    </div>
    <div v-if="story.content.footer?.length > 0">
      <StoryblokComponent
        :blok="story.content.footer[0].reference[0].content"
        :loading="loading"
      />
    </div>
  </div>
  <div v-else-if="loading" class="slug__skeleton">
    <div class="slug__skeleton--navigation">
      <div class="skeleton skeleton-logo" />
      <div class="skeleton skeleton-menu-item" />
    </div>
    <div class="slug__skeleton--content">
      <div class="skeleton skeleton-logo" />
    </div>
    <div class="slug__skeleton--footer">
      <div class="skeleton skeleton-logo" />
      <div class="flex flex-col gap-4 w-full">
        <div class="skeleton skeleton-menu-item" v-for="n in 6" :key="n"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { storyblokVersion } from "~/helpers/helpers";
import "./Slug.scss";

const { $preview } = useNuxtApp();

const route = useRoute();
const storyblokApi = useStoryblokApi();
const story = ref(null);
const loading = ref(true);
const resolveRelations = [
  "global_reference.reference",
  "global_reference_footer.reference",
];

const fetchStory = async () => {
  try {
    const slug = route.params.slug ? route.params.slug.join("/") : "home";
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: storyblokVersion(),
      resolve_relations: resolveRelations,
    });

    story.value = data.story;
  } catch (error) {
    console.error("Erro ao buscar historia:", error);

    throw createError({
      statusCode: 404,
      statusMessage:
        storyblokVersion() === "draft"
          ? "Storyblok - Erro ao buscar historia"
          : "Ups! Algo deu errado",
      fatal: true,
    });
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchStory();

  if ($preview && story.value && story.value.id) {
    useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory), {
      resolveRelations,
    });
  }

  setTimeout(() => {
    const tables = document.querySelectorAll('table');
    const maxWidths = [];

    tables.forEach((table) => {
      const tds = table.querySelectorAll('td');
      tds.forEach((td, index) => {
        const width = td.offsetWidth;
        if (!maxWidths[index] || width > maxWidths[index]) {
          maxWidths[index] = width;
        }
      });
    });

    tables.forEach((table) => {
      const tds = table.querySelectorAll('td');
      tds.forEach((td, index) => {
        if (maxWidths[index]) {
          td.style.width = `${maxWidths[index]}px`;
        }
      });
    });
  }, 100);
});

watch(story, (newStory) => {
  if (newStory) {
    const text = `Example - ${newStory.name}` || "Example";
    useSeoMeta({
      title: () => text,
      ogTitle: () => text,
    });
  }
});


</script>