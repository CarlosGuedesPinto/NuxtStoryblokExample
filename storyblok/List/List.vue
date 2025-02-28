<template>
  <div
    v-editable="blok"
    class="list w-full flex flex-col"
    :class="{
      'list--border': blok.hasBorder
    }"
  >
    <h1 v-if="blok.title" class="extrabold" v-html="formatText(blok.title)" />
    <div class="extralight list__list">
      <div class="list__item" v-for="(item, index) in listItems" :key="index">
        <img :src="arrowRightBlue" alt="dash" class="list__dash-image" />
        <span v-html="formatText(item)" />
      </div>
    </div>
  </div>
</template>
  
<script setup>
import "./List.scss";
import { formatText } from '~/src/helpers/text';
import arrowRightBlue from "~/assets/icons/ArrowRightBlue.svg";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const listItems = computed(() => {
  return props.blok.list
    .split('(-)')
    .map(item => item.trim())
    .filter(item => item.length > 0);
});
</script>