<template>
  <div class="custom-card">
    <v-hover v-slot:default="{ hover }"
              close-delay="100">
      <v-card :elevation="hover ? 16 : 2"
              :class="[{ 'on-hover': hover }, { 'black': isBlack }, { 'selected': isSelected }]"
              class="mx-auto"
              height="200"
              max-width="300">
        <v-card-text class="font-weight-medium mt-12 text-center subtitle-1" :class="{ 'white--text': isBlack }">
          {{ text }}
        </v-card-text>
      </v-card>
    </v-hover>
   </div>
</template>

<script>
  export default {
    props:{
      text: {
        required: true,
        default: "loading..."
      },
      isSelected: {
        required: false,
        default: false
      },
      isBlack: {
        required: false,
        default: false
      } 
    },
    data() {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
  .custom-card {
    width: 100%;
    margin: auto;
  }

  .v-card.selected{
    background: lightgray;
  }
  .v-card.on-hover.theme--dark {
    background-color: rgba(255, 255, 255, 0.8);
  }

  .v-card.on-hover.theme--dark > .v-card__text {
    color: #000;
  }
</style>
