<script setup>
import { defineProps } from "vue";
import Button from "./storyblok/Button/Button.vue";
import Navigation from "./storyblok/Navigation/Navigation.vue";
import { storyblokVersion } from "~/helpers/helpers";

const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
});

const storyblokApi = useStoryblokApi();
const story = ref(null);
const loading = ref(true);
const resolveRelations = [
  "global_reference.reference",
];

const fetchStory = async () => {
  try {
    const { data } = await storyblokApi.get(`cdn/stories/home`, {
      version: storyblokVersion(),
      resolve_relations: resolveRelations,
    });

    story.value = data.story;
  } catch (error) {
    console.error("Erro ao buscar historia:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchStory();
});
</script>

<template>
  <Navigation
    v-if="story?.content"
    :blok="story.content.topbar[0].reference[0].content"
    :loading="loading"/>
  <div class="error-page">
    <h1 class="">Ups!! Parece que alguma coisa correu mal.</h1>
    <Button :blok="{
      text: 'Voltar ao Início',
      link: {
        url: '/',
      },
      variant: 'primary',
      iconLeft: false,
      hasIcon: true,
    }" />
    </div>
</template>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding-left: 16px;
  max-width: 1408px;
  width: 100%;
  justify-self: center;
}

.error-content {
  @media screen and (min-width: 1104px) {
    max-width: 50%;
  };
}

h1 {
  font-size: 65px;
  margin-bottom: 22px;
}
</style>