<template>
  <div v-editable="blok" class="page gap-16 flex flex-col pb-16" :class="containerClass">
    <div class="page__component" v-for="blok in blok.body" :key="blok._uid">
      <StoryblokComponent v-if="blok.visible" :blok="blok" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const containerClass = computed(() => {
  return props.blok.body && props.blok.body[0] && props.blok.body[0].component === 'hero'
    ? ''
    : 'pt-16';
});
</script>