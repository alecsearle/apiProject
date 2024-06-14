Vue.createApp({
  data() {
    return {
      facts_internal: [],
    };
  },
  computed: {
    dog_facts: function () {
      if (this.facts_internal.length === 0) {
        return [
          {
            fact: "This website isn't working right now. Go pet a dog instead!",
            img: "derp_dog.jpg",
          },
        ];
      }

      return this.facts_internal.slice().reverse();
    },
  },
  methods: {
    get_fact: async function () {
      let req1 = fetch("https://dog-api.kinduff.com/api/facts?number=1", {
        method: "GET",
        mode: "cors",
      });
      let req2 = fetch("https://random.dog/woof.json", {
        method: "GET",
        mode: "cors",
      });

      let resp1 = await req1;
      let resp2 = await req2;

      if (resp1.status === 200 && resp2.status === 200) {
        let fact = resp1.json();
        let pic = resp2.json();
        this.facts_internal.push({
          fact: (await fact).facts[0],
          img: (await pic).url,
        });
      } else {
        console.log(resp1);
      }
    },
  },
  created: function () {
    this.get_fact();
  },
}).mount("#app");
