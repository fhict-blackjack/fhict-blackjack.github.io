<template>
  <div class="custom-chat">
      <v-card class="elevation-12">
        <v-toolbar>
          <v-toolbar-title>Chat</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-list ref="chat" id="logs">
            <template v-for="(item, index) in logs">
              <v-subheader v-if="item" :key="index">{{ item }}</v-subheader>
            </template>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-form @submit.prevent="submit">
            <v-text-field class="text-field-full-width" v-model="msg" label="Message" single-line solo-inverted :autocomplete="autocomplete"></v-text-field>
            
            <v-btn small  type="submit" elevation="2">Send</v-btn>
          </v-form>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      logs: [],
      msg: null,
      autocomplete: "off"
    }),
    methods: {
      submit() {
        this.logs.push(this.msg);
        this.msg = "";
      }
    },
    watch: {
      logs() {
        setTimeout(() => {
          this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
        }, 0);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #logs {
    height: 100px;
    min-width: 500px;
    overflow: auto;
  }

  .text-field-full-width .v-input__control {
    width: 100%;
  }
  .text-field-full-width .v-label {
    width: 100%
  }
</style>
