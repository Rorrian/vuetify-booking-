<template>
  <!-- -->
  <!--Атрибут -->
  <!--Во Vuetify сетка состоит из компонентов <v-container>, <v-row> и <v-col> -->
  <v-container>
    <v-row>
      <!--Можем задавать адаптивность сетки на разных разрешениях через атрибуты-->
      <!--Атрибут "lg" - вариант разрешения и отображение на нем. "Desktop" (1264px > < 1904px*). lg="3" - колонка будет занимать 3 усл.деления сетки Vuetify из 12(по умолчанию)-->
      <!--Атрибут "offset-lg" - смещение(позиционирование) колонки на странице. При offset-lg="4" - колонка будет по центру экрана -->
      <v-col lg="8" offset-lg="2">
        <v-stepper v-model="e1">
          <!--Заголовки табов-->
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1"> Choose destination</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2"> Choose flight</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3"> Final information</v-stepper-step>
          </v-stepper-header>
          <!--Содержимое табов-->
          <v-stepper-items>
            <v-stepper-content step="1">
              <!--Валидация "от Vuetify"-->
              <!--Нужно создать ссылку на форму(атрибут ref)-->
              <v-form ref="destinationForm">
                <!--Инпут с фильтрацией по вводу и подстановкой значений-->
                <!--Связываем с v-model с конкретным выбранным значением, а ":items" с массивом значений-->
                <!--Prop "rules" - для валидации значений(есть другие библиотеки для валидации с богатым функционалом).
                Привязан к массиву правил-->
                <!--Класс "mt-1" - отступ 4px, шаг у значений тоже 4px-->
                <v-autocomplete
                  class="mt-1"
                  v-model="destination"
                  :items="destinations"
                  outlined
                  dense
                  label="Destination"
                  rounded
                  :rules="destinationRules"
                />
                <v-row>
                  <v-col>
                    <!--При клике по инпуту будем открывать попап с <v-date-picker> - @click="dateDialog = true" -->
                    <v-text-field
                      :value="dates[0]"
                      label="Start"
                      outlined
                      rounded
                      dense
                      readonly
                      @click="dateDialog = true"
                      :rules="dateStartRules"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      :value="dates[1]"
                      label="End"
                      outlined
                      rounded
                      dense
                      readonly
                      @click="dateDialog = true"
                      :rules="dateEndRules"
                    />
                  </v-col>
                </v-row>
                <v-btn block color="primary" rounded @click="search"> Search flights</v-btn>
              </v-form>
              <v-dialog v-model="dateDialog" width="500">
                <v-card>
                  <div class="d-flex flex-column">
                    <!--Компонент <v-date-picker> - для выбора дат в "календаре"-->
                    <!--В "v-model" передаем значения даты начала и конца-->
                    <!--Атрибут "range" - выбираем интервал дат-->
                    <v-date-picker v-model="dates" range></v-date-picker>
                    <v-btn @click="dateDialog = false" rounded color="primary">Submit</v-btn>
                  </div>
                </v-card>
              </v-dialog>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-list>
                <!--Вариант 1-->
                <!--Компонент <v-list-item-group> - дает возможность выбрать элемент из списка и подсвечивает его-->
                <!-- <v-list-item-group>
                  &lt;!&ndash;Элемент списка(контент внутри тега <v-list-item-content>) будет состоять из 2 линий - атрибут "two-line"&ndash;&gt;
                  <v-list-item two-line v-for="(item, i) in flightsList" :key="i">
                    <v-list-item-avatar>
                      <v-img :src="item.image"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                      <v-list-item-subtitle>{{ item.dates[0] }} - {{ item.dates[1] }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>-->
                <!--Вариант 2-->
                <!--Компонент <v-virtual-scroll> - отображает необходимое(указанное) кол-во элементов. Рендерятся только элемнеты кот. попадают в области видимости.
                Можно доп. подгружать ближайшие в отображаемым элементам с помощью атрибута "bench". Логику выше(с визуалом и выбором) добавим вами-->
                <!-- -->
                <!--Не нужен перебор с циклом v-for, компонент <v-virtual-scroll> сам это делает-->
                <v-virtual-scroll :items="flightsList" height="600" item-height="80px">
                  <template v-slot:default="{ item }">
                    <v-list-item two-line :key="item" @click="flightId = item.id">
                      <v-list-item-avatar>
                        <v-img :src="item.image"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{ item.dates[0] }} - {{ item.dates[1] }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <!--Компонент <v-list-item-action> - для выбранного элемента списка выводит чекбокс-->
                      <v-list-item-action v-if="item.id === flightId">
                        <v-icon color="primary">mdi-account-check-outline</v-icon>
                      </v-list-item-action>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </v-list>
              <v-row>
                <v-col>
                  <v-btn rounded dense outlined block color="accent" @click="e1 = 1"> Cancel</v-btn>
                </v-col>
                <v-col>
                  <v-btn color="primary" rounded dense block :disabled="flightId === null" @click="e1 = 3">
                    Search
                  </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="3">
              <!--Текст можно выводить внутри(поверх) картинки-->
              <v-card class="mb-12" v-if="selectedFlight">
                <v-img :src="selectedFlight.image">
                  <v-card-title>{{ selectedFlight.title }}</v-card-title>
                </v-img>
                <v-card-text>
                  <!--Класс для текста "text-subtitle-1" - -->
                  <div class="text-subtitle-1">{{ selectedFlight.dates[0] }} - {{ selectedFlight.dates[1] }}</div>
                </v-card-text>
              </v-card>

              <v-row>
                <v-col>
                  <v-btn rounded dense outlined block color="accent" @click="e1 = 2"> Cancel</v-btn>
                </v-col>
                <v-col>
                  <v-btn color="primary" rounded dense block :disabled="flightId === null"> Confirm</v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fakeList } from "@/helpers/fakeData";

export default {
  name: "Booking",
  data: () => ({
    e1: 2,
    //Диалоговое окно длф выбора даты
    dateDialog: false,
    //Массив с датами начала и конца
    dates: [],
    //Массив местоположений
    destinations: ["Mars", "Moon"],
    //Выбранное значение местоположения
    destination: null,
    //Выбранное значение варианта полета
    flightId: null,
    //Здесь валидация производится "вручную"(нужно прописывать Regex для проверки Email, выр-е при проверке длинны пар-ра.
    //При исп-и библиотек Vee-validate или Vuelidate - там есть уже готовые шаблоны для проверок
    destinationRules: [(v) => !!v || "Destination is required"],
    dateStartRules: [(v) => !!v || "Start date is required"],
    dateEndRules: [(v) => !!v || "End date is required"],
  }),
  methods: {
    search() {
      const isValid = this.$refs["destinationForm"].validate();
      //Если форма не валидна, то ничего не делаем и выходим из ф-и, иначе - переходим на след. этап
      if (!isValid) {
        return;
      }
      this.e1 = 2;
    },
  },
  computed: {
    //Имитация запроса на бэк и получения данных - исп. готовую ф-ю для этого из файла fakeData.js
    flightsList() {
      return fakeList(["2022-01-01", "2019-01-02"], 1000);
    },
    selectedFlight() {
      return this.flightsList[this.flightId];
    },
  },
};
</script>

<style scoped>
/*.list-flights {
  height: 68vh;
  overflow-y: auto;
}*/
</style>
