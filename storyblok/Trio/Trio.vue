<template>
  <div
    v-editable="blok"
    class="trio w-full"
  >
    <template v-if="blok.content.length > 0" class="trio__content">
      <template 
        v-for="(blok, index) in blok.content"
        :key="index">
        <component
          v-if="blok.visible"
          :is="blok.component"
          :blok="blok"
          class="trio__item"
        />
      </template>
    </template>
  </div>
</template>
  
<script setup>
import "./Trio.scss";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>