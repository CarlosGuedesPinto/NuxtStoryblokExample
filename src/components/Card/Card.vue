<template>
  <NuxtLink :to="`/${item.redirect}`">
    <div class="card">
        <div v-if="item.image" class="card__image-container">
          <div class="card__image-overlay" />
          <img
            :src="item.image.filename"
            :alt="item.image.alt"
            class="w-full card__image h-full"
            loading="lazy"
          />
        </div>
        <div class="card__content flex flex-col gap-4 h-[100%]">
          <span class="card__title extrabold">{{ item.title }}</span>
          <span class="card__text extralight">{{ item.primaryText }}</span>

          <div class="justify-between flex extrabold">
            <span class="card__button-text">Saber mais</span>
            <img :src="arrowRightBlue" alt="arrowRight" class="card__icon"/>
          </div>
        </div>
    </div>
  </NuxtLink>
</template>
  
<script setup>
import "./Card.scss";
import arrowRightBlue from "~/assets/icons/ArrowRightBlue.svg";

const props = defineProps({
  item: {
    type: {
      _uid: String,
      title: String,
      primaryText: String,
      image: Object,
      redirect: String,
    },
    required: true,
  }
});
</script>