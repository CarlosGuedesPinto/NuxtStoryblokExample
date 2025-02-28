<template>
  <NuxtLink
    v-if="blok.link && !isAnchor"
    :to="blok.link.url ? blok.link.url : `/${blok.link.cached_url}`"
    class="button"
    :class="[`button--${blok.variant}`, {
      '!justify-center': isCentered,
      'button--disabled': disabled,
    }]" 
    :disabled="disabled"
    :target="blok.link.target"
  >
    {{ blok.text }}
    <template v-if="blok.hasIcon">
      <img :src="arrowRightBlue" alt="arrowRight" class="button__icon"/>
    </template>
  </NuxtLink>
  <button 
    v-else 
    class="button" 
    :class="[`button--${blok.variant}`, {
      '!justify-center': isCentered,
      'button--disabled': disabled,
    }]" 
    @click="handleClick"
    :disabled="disabled">
    {{ blok.text }}
    <template v-if="blok.hasIcon">
      <img :src="arrowRightBlue" alt="arrowRight" class="button__icon"/>
    </template>
  </button>
</template>

<script setup>
import "./Button.scss";
import arrowRightBlue from "~/assets/icons/ArrowRightBlue.svg";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
  isAnchor: {
    type: Boolean,
    default: false,
  },
  isCentered: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['clicked']);

console.log(props.blok.link)

const handleClick = (event) => {
  emit('clicked', event);
};
</script>