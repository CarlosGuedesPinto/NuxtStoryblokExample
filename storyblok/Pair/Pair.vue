<template>
  <div
    v-editable="blok"
    class="pair w-full"
  >
    <template v-if="blok.content.length > 0" class="pair__content">
      <template 
        v-for="(blok, index) in blok.content"
        :key="index">
        <component
          v-if="blok.visible"
          :is="blok.component"
          :blok="blok"
        />
      </template>
    </template>
  </div>
</template>
  
<script setup>
import "./Pair.scss";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>