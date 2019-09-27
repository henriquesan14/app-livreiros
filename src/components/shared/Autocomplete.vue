<template>
  <div class="autocomplete" :id="'autocomplete-'+idAutocomplete">
    <div class="input" @click="toggleVisible" v-text="valorInicial"></div>
    <div class="placeholder" v-if="selectedItem == null && valorInicial == null" v-text="title"></div>
    <div v-show="visible" class="popover">
      <b-form-input
        size="sm"
        ref="input"
        type="text"
        v-model="query"
        @keydown.up="up"
        @keydown.down="down"
        @keydown.enter="selectItem"
        placeholder="Digite algo..."
      ></b-form-input>
      <div class="options" ref="optionsList">
        <ul>
          <li
            :class="{'selected': (selected == index)}"
            v-for="(item, index) in items"
            :key="index"
            v-text="item[filterby]"
            @click="itemClicked(index)"
          ></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      default: () => [],
      type: Array
    },
    filterby: {
      type: String
    },
    title: {
      default: "Selecione...",
      type: String
    },
    shouldReset: {
      type: Boolean,
      default: true
    },
    idAutocomplete: {
      type: Number
    },
    valorInicial: {
      type: String
    }
  },
  name: "Autocomplete",
  data() {
    return {
      itemHeight: 39,
      query: "",
      visible: false,
      selected: 0,
      selectedItem: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("click", e => {
        const elements = e.path.map(e => e.id);
        if (elements.includes("autocomplete-" + this.idAutocomplete)) {
          return;
        }
        this.visible = false;
      });
    });
  },
  methods: {
    toggleVisible() {
      this.visible = !this.visible;
      setTimeout(() => {
        this.$refs.input.focus();
      }, 50);
    },
    itemClicked(index) {
      this.selected = index;
      this.selectItem();
    },
    selectItem() {
      if (!this.items.length) {
        return;
      }
      this.selectedItem = this.items[this.selected];
      this.visible = false;

      if (this.shouldReset) {
        this.query = "";
        this.selected = 0;
      }
      this.$emit("selected", this.selectedItem);
    },
    up() {
      if (this.selected == 0) {
        return;
      }
      this.selected -= 1;
      this.scrollToItem();
    },
    down() {
      if (this.selected > this.items.length - 2) {
        return;
      }
      this.selected += 1;
      this.scrollToItem();
    },
    scrollToItem() {
      this.$refs.optionsList.scrollTop = this.selected * this.itemHeight;
    }
  },
  watch: {
    query() {
      this.$emit("change", this.query);
    }
  }
};
</script>

<style scoped>
.autocomplete {
  width: 100%;
  position: relative;
}

.input {
  height: calc(1.5em + 0.5rem + 2px);
  border-radius: 0.2rem;
  border: 1px solid lightgray;
  box-shadow: 0 0 10px #eceaea;
  font-size: 0.875rem;
  padding-left: 10px;
  padding-top: 3px;
  cursor: text;
}

.placeholder {
  position: absolute;
  top: 4px;
  left: 11px;
  font-size: 0.875rem;
  color: #7f8c8d;
  pointer-events: none;
}

.popover {
  min-height: 50px;
  border: 2px solid lightgray;
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  max-width: 100%;
  background: #fff;
  border-radius: 3px;
  text-align: center;
}

.popover input {
  width: 98%;
  margin-top: 5px;
  font-size: 0.875rem;
  border-radius: 3px;
  border: 1px solid lightgray;
  margin: 8px auto;
}

.options {
  max-height: 150px;
  overflow-y: scroll;
  margin-top: 5px;
}

.options ul {
  list-style-type: none;
  text-align: left;
  padding-left: 0;
}

.options ul li {
  border-bottom: 1px solid lightgray;
  padding: 10px;
  cursor: pointer;
  background: #f1f1f1;
}

.options ul li:first-child {
  border-top: 2px solid #d6d6d6;
}
.options ul li:not(.selected):hover {
  background: #8c8c8c;
  color: #fff;
}

.options ul li.selected {
  background: #3498db;
  color: #fff;
  font-weight: 600;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background-color: #2980b9;
}
</style>