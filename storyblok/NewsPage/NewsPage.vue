<template>
  <div v-editable="blok" class="news-page flex flex-col pb-16 pt-4">
    <div class="news-page__image-container">
      <div class="news-page__image-overlay" />
      <img
        :src="blok.image.filename"
        :alt="blok.image.alt"
        class="w-full news-page__image h-full"
      />
    </div>
    <TitleContent :blok="titleContentBlok" class="news-page__primary-text pt-[50px]"/>
    <div class="news-page__content" v-for="blok in blok.body" :key="blok._uid">
      <StoryblokComponent :blok="blok" v-if="blok.visible"/>
    </div>
  </div>
</template>

<script setup>
import TitleContent from '../TitleContent/TitleContent.vue';
import './NewsPage.scss';

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const titleContentBlok = {
  title: props.blok.title,
  content: [
    {
      alignedLeft: false,
      component: 'text',
      hasBorder: false,
      text: props.blok.primaryText,
      title: "",
      visible: true
    }
  ],
  visible: true
};
</script>
