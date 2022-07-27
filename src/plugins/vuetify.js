import Vue from "vue";
import Vuetify from "vuetify/lib";

//Использование палитры Vuetify
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  //Задаем свои цвета для темы
  theme: {
    //Переключение темы на темную
    dark: true,
    themes: {
      light: {
        //Использование палитры Vuetify
        primary: colors.purple,
        secondary: "#b0bec5",
        accent: "#8c9eff",
        error: "#b71c1c",
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
});
