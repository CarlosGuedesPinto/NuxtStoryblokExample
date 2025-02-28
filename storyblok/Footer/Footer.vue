<template>
  <footer class="footer">
    <div class="footer__container w-full">
      <div class="footer__rows--row footer__rows--row--left flex-col flex">
        <div class="footer__rows--row-image">
          <img :src="logoWhite" alt="Logo" />
        </div>

        <div class="footer__rows--row-content flex-col flex">
          <div class="flex flex-col">
            <span class="extrabold">Coordenação do Projeto</span>
            <span class="extralight" v-html="formatText(blok.projectCoordination)" />
          </div>

          <div class="flex flex-col">
            <span class="extrabold">Morada</span>
            <span class="extralight" v-html="formatText(blok.address)" />
          </div>

          <div class="flex flex-col">
            <span class="extrabold">Mail</span>
            <span class="extralight">{{ blok.mail }}</span>
          </div>

          <div class="flex flex-col">
            <span class="extrabold">Telefone</span>
            <span class="extralight" v-html="formatText(blok.cellphone)" />
          </div>
        </div>
      </div>
      <div class="footer__rows grid grid-flow-col">
        <div
          v-for="row in blok.rows"
          :key="row.uid"
          class="footer__rows--row footer__rows--row--border flex flex-col gap-4"
        >
          <div class="footer__rows--row-image self-center">
            <img :src="row.logo.filename" :alt="row.logo.alt" loading="lazy" class=""/>
          </div>
          
          <NuxtLink 
            class="extrabold" 
            :to="row.website.cached_url" 
            target="_blank"
            :title="row.website.title"
            rel="noopener noreferrer">{{ row.website.title }}</NuxtLink>

          <div class="flex flex-col">
            <span class="extrabold">Morada</span>
            <span class="extralight" v-html="formatText(row.address)" />
          </div>

          <div class="flex flex-col">
            <span class="extrabold">Mail</span>
            <span class="extralight">{{ row.mail }}</span>
          </div>

          <div class="flex flex-col">
            <span class="extrabold">Telefone</span>
            <span class="extralight" v-html="formatText(row.cellphone)" />
          </div>

          <div class="flex flex-col">
            <span class="extrabold">Redes Sociais</span>
            <NuxtLink
              v-if="row.socials[0].instagram_link"
              :to="row.socials[0].instagram_link.cached_url"
              target="_blank"
              rel="noopener noreferrer"
              class="extralight"
              >Instagram</NuxtLink
            >
            <NuxtLink
              v-if="row.socials[0].facebook_link"
              :to="row.socials[0].facebook_link.cached_url"
              target="_blank"
              rel="noopener noreferrer"
              class="extralight"
              >Facebook</NuxtLink
            >
            <NuxtLink
              v-if="row.socials[0].linkedin_link"
              :to="row.socials[0].linkedin_link.cached_url"
              target="_blank"
              rel="noopener noreferrer"
              class="extralight"
              >LinkedIn</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
  <div class="footer__copyright">
    <div class="footer__copyright--container">
      <img :src="logosFooter" alt="Logo" class="footer__copyright--logos max-h-[36px] max-w-[100%]"/>
      <div class="footer__copyright--authors flex flex-col">
        <span class="">Example ©</span>
        <span class="">
          <NuxtLink 
            to="https://angelogoncalves.pt/" 
            target="_blank"
            rel="noopener noreferrer">
          </NuxtLink> | Programação Carlos Guedes </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import "./Footer.scss";
import logoWhite from "~/assets/logos/LogoDesktopWhite.svg";
import logosFooter from "~/assets/logos/LogosFooter.svg";
import { formatText } from "~/src/helpers/text"

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});
</script>

