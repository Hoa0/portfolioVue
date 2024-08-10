<template>
  <div>
    <p>Default format: {{ defaultFormat }}</p>
    <p>Format 1: {{ format1 }}</p>
    <p>Format 2: {{ format2 }}</p>
    <p>Format 3: {{ format3 }}</p>
    <p>Custom pattern: {{ customPatternFormat }}</p>
  </div>
</template>

<script>
import date from "date-and-time";

export default {
  data() {
    return {
      now: new Date(),
      defaultFormat: "",
      format1: "",
      format2: "",
      format3: "",
      customPatternFormat: "",
      timer: null,
    };
  },
  created() {
    this.updateTime();
    this.timer = setInterval(this.updateTime, 1000); // Update elke seconde
  },
  beforeDestroy() {
    clearInterval(this.timer); // Stop het interval bij het vernietigen van het component
  },
  methods: {
    updateTime() {
      this.now = new Date();
      this.defaultFormat = date.format(this.now, "YYYY/MM/DD HH:mm:ss");
      this.format1 = date.format(this.now, "ddd, MMM DD YYYY");
      this.format2 = date.format(this.now, "hh:mm A [GMT]Z");
      this.format3 = date.format(this.now, "hh:mm A [GMT]Z", true);

      //   const pattern = date.compile('ddd, MMM DD YYYY');
      //   this.customPatternFormat = date.format(this.now, pattern);
      const dateTime = date.format(this.now, "YYYY/MM/DD HH:mm:ss");
      this.customPatternFormat = `Netherland, ${dateTime}`;
    },
  },
};
</script>
