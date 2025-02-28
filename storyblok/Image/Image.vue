<template>
  <div
    v-editable="blok"
    class="image w-full"
  >
    <img
      :src="blok.image.filename"
      :alt="blok.image.alt"
      class="w-full rounded-lg"
    />
  </div>
</template>

<script setup>

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>