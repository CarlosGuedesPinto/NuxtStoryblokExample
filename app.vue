<template>
  <body>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </body>
</template>

<style lang="sass">
h1
  font-family: 'ldtech', sans-serif
  color: #0082FF

body
  font-family: 'ppmori', sans-serif
  color: #0082FF
  background-color: #F7FBFF

* 
  font-synthesis: none !important

img
  max-width: unset

.text__ul
    list-style-type: disc
    padding-left: 15px

    li::marker
      font-size: 15px

ol
  padding-left: 15px
  list-style-type: decimal

  &[type="a"]
    list-style-type: lower-alpha

  &[type="i"]
    list-style-type: lower-roman

.no-underline
  text-decoration-line: none !important

  *
    text-decoration-line: none !important
    

.extrabold
  font-family: 'ppmori-extrabold', sans-serif

.semibold
  font-family: 'ppmori-semibold', sans-serif

.extralight
  font-family: 'ppmori-extralight', sans-serif

.ldtech
  font-family: 'ldtech', sans-serif

.blue-text 
  color: #0082FF

  *
    color: #0082FF

.blue-text:hover
  color: #FF9E00

  *
    color: #FF9E00
  

</style>