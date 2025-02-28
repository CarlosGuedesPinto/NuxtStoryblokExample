<template>
  <div v-editable="blok" class="questions-form w-full flex gap-6">
    <div class="questions-form__form">
      <form class="flex flex-col gap-4" @submit.prevent="submitForm">
        <div>
          <label for="firstName">Primeiro Nome</label>
          <input
            id="firstName"
            type="text"
            placeholder="Escreva aqui o seu nome"
            v-model="formData.firstName"
            required
          />
          <label for="lastName">Ultimo Nome</label>
          <input
            id="lastName"
            type="text"
            placeholder="Escreva aqui o seu ultimo nome"
            v-model="formData.lastName"
            required
          />
        </div>
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Escreva aqui o seu email"
          v-model="formData.email"
          required
        />
        <label for="phoneNumber">Telefone</label>
        <input
          id="phoneNumber"
          type="text"
          placeholder="Introduza aqui o seu numero de telefone"
          v-model="formData.phoneNumber"
          required
        />
        <!-- Create custom select component -->
        <label for="selection">Politécnico de interesse</label>
        <select id="selection" v-model="formData.selection" required>
          <option value="" disabled selected>
            Selecione aqui o seu politecnico de interesse
          </option>
          <option value="porto">Politécnico do Porto</option>
          <option value="viana">
            Instituto Politécnico de Viana do Castelo
          </option>
          <option value="braganca">Instituto Politécnico de Bragança</option>
          <option value="cavado">
            Instituto Politécnico do Cávado e do Ave
          </option>
        </select>
        <textarea
          placeholder="Escreva aqui as suas questoes"
          v-model="formData.message"
          required
        ></textarea>
        <!-- Create custom button -->
        <button type="submit">Submeter formulario</button>
      </form>
    </div>
    <img
      :src="blok.image.filename"
      :alt="blok.image.alt"
      class="w-full mb-4"
      loading="lazy"
    />
  </div>
</template>
  
<script setup>
import "./QuestionsForm.scss";

const props = defineProps({
  blok: {
    type: Object,
    required: true,
  },
});

const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  selection: "",
  message: "",
});

const submitForm = () => {
  const mailtoLink = `mailto:carlosguedespinto99@gmail.com?subject=Form Submission&body=${encodeURIComponent(
    `Primeiro Nome: ${formData.value.firstName}\n` +
      `Ultimo Nome: ${formData.value.lastName}\n` +
      `Email: ${formData.value.email}\n` +
      `Telefone: ${formData.value.phoneNumber}\n` +
      `Politécnico de interesse: ${formData.value.selection}\n` +
      `Questões: ${formData.value.message}`
  )}`;
  window.location.href = mailtoLink;
};
</script>