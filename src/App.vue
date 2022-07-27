<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-icon size="40">mdi-rocket-launch</v-icon>
        <div class="text-h4">RocketBook</div>
      </div>
    </v-app-bar>

    <v-main>
      <Booking />
    </v-main>
  </v-app>
</template>

<script>
import Booking from "@/components/Booking";
export default {
  name: "App",
  components: { Booking },
  data: () => ({
    //
  }),
};
</script>
