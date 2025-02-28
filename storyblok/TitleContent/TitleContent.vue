<template>
  <div
    v-if="!loading"
    v-editable="blok"
    class="title-content w-full"
  >
    <div class="title-content__title-wrapper" :class="{
        'title-content__title-wrapper--border': blok.title && blok.content.length > 0
      }">
      <h1 v-if="blok.title" class="title-content__title ldtech"  v-html="formatText(blok.title)" />
      <NuxtLink v-if="blok.link" class="title-content__link extrabold self-end text-right" :to="blok.link.url ? blok.link.url : `/${blok.link.cached_url}`">{{ blok.linkLabel }}</NuxtLink>
    </div>
    <div v-if="blok.content.length > 0" class="title-content__content">
      <template
        v-for="(blok, index) in blok.content"
        :key="index">
        <component
          v-if="blok.visible"
          :is="blok.component"
          :blok="blok"
        />
      </template>
    </div>
  </div>
  <div v-else class="title-content__skeleton">
    <div class="skeleton skeleton-logo" />
    <div class="skeleton skeleton-content" />
  </div>

</template>
  
<script setup>
import { formatText } from '~/src/helpers/text';
import './TitleContent.scss';

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>