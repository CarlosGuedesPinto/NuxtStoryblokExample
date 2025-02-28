<template>
  <div class="pagination flex gap-4 justify-center">
    <Button 
      :blok="{
        text: 'Primeira página',
        variant: 'primary',
        iconLeft: false,
        hasIcon: false,
      }" 
      @clicked="goToPage(1)" 
      :disabled="currentPage === 1" 
      isCentered 
    />
    <Button
      v-if="currentPage - 1 > 0" 
      :blok="{
        text: currentPage - 1,
        variant: 'primary',
        iconLeft: false,
        hasIcon: false,
      }"
      isNumber
      @clicked="goToPage(currentPage - 1)"
      isCentered
      class="isNumber"
    />
    <Button
      :blok="{
        text: currentPage,
        variant: 'primary',
        iconLeft: false,
        hasIcon: false,
      }"
      isNumber
      isCentered
      disabled
      class="isNumber"
    />
    <Button
      v-if="hasNextPage"
      :blok="{
        text: currentPage + 1,
        variant: 'primary',
        iconLeft: false,
        hasIcon: false,
      }"
      isNumber
      isCentered
      @clicked="goToPage(currentPage + 1)"
      class="isNumber"
    />
    <Button 
      :blok="{
        text: 'Última página',
        variant: 'primary',
        iconLeft: false,
        hasIcon: false,
      }" 
      @clicked="goToPage('last')" 
      :disabled="!hasNextPage" 
      isCentered
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import Button from '../../Button/Button.vue';
import './Pagination.scss';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  hasNextPage: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['pageChange']);

const goToPage = (page) => {
  emit('pageChange', page);
};
</script>