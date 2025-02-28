<template>
  <div
    v-editable="blok"
    class="text w-full flex flex-col"
    :class="{
      'text--border': blok.hasBorder
    }"
  >
    <div class="text__container flex flex-col" :class="{
      'text__container--aligned-left': blok.alignedLeft
    }">
      <h1 v-if="blok.title" class="extrabold pb-1" v-html="formatText(blok.title)" />
      <span class="extralight text__content" v-html="formatText(blok.text)"></span>
    </div>
  </div>
</template>
  
<script setup>
import "./Text.scss";
import { formatText } from '~/src/helpers/text';

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>