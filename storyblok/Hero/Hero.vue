<template>
  <div
    v-editable="blok"
    class="hero w-full aspect-video bg-cover bg-center flex justify-center"
    :style="{ backgroundImage: `url(${blok.image.filename})` }"
    ref="hero"
  >
    <div class="hero__overlay" :class="{
      'hero__overlay--no-opacity': !blok.image.filename,
    }" />
    <div class="hero__content flex flex-col">
      <div class="hero__content--container">
        <h1 class="hero__content--title ldtech" v-html="formatText(blok.title)" />
        <template v-if="blok.button.length > 0">
          <component
            v-for="(buttonBlok, index) in blok.button"
            :key="index"
            :is="buttonBlok.component"
            :blok="buttonBlok"
            :is-anchor="blok.isAnchorButton"
            @clicked="scroll" />
        </template>
      </div>
      <span class="hero__future-button extrabold">#construir o futuro</span>
    </div>
  </div>
</template>
  
<script setup>
import "./Hero.scss";
import { formatText } from "~/src/helpers/text";
import { preloadImages } from "~/src/helpers/image";
import Button from "../Button/Button";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const hero = ref(null);

const scroll = (event) => {
  event.preventDefault();
  const offsetElement = hero.value;
  if (offsetElement) {
    const offset = window.innerHeight - (64);
    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  }
};

onMounted(() => {
  preloadImages([
    props.blok.image.filename,
    ...props.blok.button.map(buttonBlok => buttonBlok.image?.filename).filter(Boolean)
  ]);
});
</script>