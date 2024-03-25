<template>
  <div>
    <MealsSkeleton v-if="isLoading" :layout="'list'" />

    <div
      v-else
      class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4"
    >
      <div
        class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
      >
        <div
          class="flex flex-column align-items-center sm:align-items-start gap-3"
        >
          <div class="text-2xl font-bold text-900">
            {{ mealData.name }}
          </div>
          <Rate
            :controller="'meals/rate'"
            :rateId="mealData.id"
            :rateValue="mealData.rating"
            :shouldRate="ability.can('custom', 'meals')"
          />
          <div class="flex align-items-center gap-3">
            <span class="flex align-items-center gap-2">
              <span class="font-semibold">{{ mealData.dietCategory }}</span>
            </span>

            <Tag :value="mealData.stock" :severity="getSeverity(mealData)">
              {{ mealData.stock }}
            </Tag>
          </div>
          <div>
            <span class="text-xl">{{ mealData.calories }} Cal</span>,
            <span class="text-xl">{{ mealData.price }} $</span>
          </div>
          <div>
            <span :style="{ fontWeight: 'bold' }"> Carbon Footprint: </span>
            {{ mealData.carbonFootprint }} %
          </div>

          <div>
            <span :style="{ fontWeight: 'bold' }"> Intolerance: </span>
            {{ mealData.intolerance }}
          </div>
        </div>

        <div class="flex flex-column">
          <div>
            <div class="flex align-items-center gap-3 justify-content-center">
              <Button
                icon="pi pi-upload"
                severity="warning"
                rounded
                outlined
                size="small"
                v-if="ability.can('upload', 'meals')"
                @click="
                  () => $emit('upload-click', mealData.id, mealData.image)
                "
              />
              <Button
                icon="pi pi-shopping-bag"
                style="color: var(--teal-400)"
                rounded
                outlined
                size="small"
                v-if="ability.can('edit', 'meals')"
                @click="() => $emit('stock-click', mealData.id, mealData.stock)"
              />
            </div>
            <div class="flex align-items-center gap-1 justify-content-center">
              <Button
                icon="pi pi-file-edit"
                severity="help"
                v-if="ability.can('edit', 'meals')"
                text
                rounded
                size="small"
                style="padding-left: 0; padding-right: 0"
                @click="$emit('edit-clicked', mealData)"
                aria-label="Favorite"
              />
              <Button
                icon="pi pi-trash"
                severity="danger"
                text
                v-if="ability.can('delete', 'meals')"
                rounded
                style="padding-inline: 0; padding-right: 0"
                @click="() => $emit('open-modal', mealData.id, 'delete')"
                size="small"
                aria-label="Cancel"
              />
            </div>
          </div>

          <Button
            icon="pi pi-cart-plus"
            severity="warning"
            text
            v-if="ability.can('custom', 'meals')"
            rounded
            size="small"
            @click="() => $emit('open-modal', mealData, 'checkout')"
          />

          <!-- IMAZHI -->
          <div class="image-wrapper">
            <img
              class="image-content"
              :src="`http://localhost:1112/${mealData.image}`"
              :alt="mealData.name"
            />
            {{ mealData.image }}
          </div>
        </div>
      </div>
    </div>

    <Accordion :activeIndex="1">
      <AccordionTab :key="'Ingredients'" :header="'Ingredients '">
        <div v-if="mealData.ingredients && mealData.ingredients.length !== 0">
          <main
            class="leaderboard_profiles"
            v-for="(ingredient, index) in mealData.ingredients"
            v-bind:key="index"
          >
            <article class="leaderboard__profile" style="margin-bottom: 0.5rem">
              <!-- <img
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt="Mark Zuckerberg"
                                class="leaderboard__picture"
                              /> -->
              <span class="leaderboard__name"> {{ ingredient.name }}</span>
              <span class="leaderboard__value"
                >{{ ingredient.portion }}g<span>Amount</span></span
              >
            </article>
          </main>
        </div>
        <div v-else>
          <InlineMessage style="width: 100%" severity="error">
            No ingredients
          </InlineMessage>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script lang="ts">
import Button from "primevue/button";
import { PropType, defineComponent, onMounted, ref, shallowRef } from "vue";
import IMeal from "@/interfaces/database/IMeal";
import { useAbility } from "@casl/vue";
import Rate from "@/components/formElements/Rate.vue";
import Tag from "primevue/tag";
import MealsSkeleton from "../MealsSkeleton.vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import InlineMessage from "primevue/inlinemessage";

export default defineComponent({
  name: "MealListView",
  components: {
    Rate,
    Tag,
    Button,
    MealsSkeleton,
    Accordion,
    AccordionTab,
    InlineMessage,
  },
  emits: ["stock-click", "upload-click", "edit-clicked", "open-modal"],
  props: {
    mealData: { type: Object as PropType<IMeal>, required: true },
    isLoading: { type: Boolean, required: true },
  },
  setup(props, { emit }) {
    const getSeverity = (product: any) => {
      switch (true) {
        case product.stock > 10:
          return "success";

        case product.stock < 10 && product.stock >= 5:
          return "warning";

        case product.stock < 5:
          return "danger";

        default:
          return undefined;
      }
    };
    const ability = useAbility();
    return { ability, getSeverity };
  },
});
</script>
<style scoped lang="scss">
.image-wrapper {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 1rem;
}

.image-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header-layout {
  display: flex;
  flex-direction: column;
  justify-content: start;
}

@media (min-width: 650px) {
  .header-layout {
    flex-direction: row;
    justify-content: space-between;
  }
}
.custom-layout {
  display: flex;
  flex-direction: column;
  justify-content: start; /* Default for screens above 700px */
}

@media (min-width: 700px) {
  .custom-layout {
    flex-direction: row;
    justify-content: space-between; /* For screens 700px and above */
  }
}

.centered-content-layout {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

@media (min-width: 800px) {
  .centered-content-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-block: 3rem;
  }
}

.leaderboard {
  max-width: 490px;
  width: 100%;
  border-radius: 12px;

  header {
    --start: 15%;

    height: 130px;
    background-image: repeating-radial-gradient(
        circle at var(--start),
        transparent 0%,
        transparent 10%,
        rgba(54, 89, 219, 0.33) 10%,
        rgba(54, 89, 219, 0.33) 17%
      ),
      linear-gradient(to right, #5b7cfa, #3659db);
    color: #fff;
    position: relative;
    border-radius: 12px 12px 0 0;
    overflow: hidden;

    .leaderboard__title {
      position: absolute;
      z-index: 2;
      top: 50%;
      right: calc(var(--start) * 0.75);
      transform: translateY(-50%);
      text-transform: uppercase;
      margin: 0;

      span {
        display: block;
      }

      &--top {
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 6.5px;
      }

      &--bottom {
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 3.55px;
        opacity: 0.65;
        transform: translateY(-2px);
      }
    }

    .leaderboard__icon {
      fill: #fff;
      opacity: 0.35;
      width: 50px;
      position: absolute;
      top: 50%;
      left: var(--start);
      transform: translate(-50%, -50%);
    }
  }

  &__profiles {
    background-color: black;
    border-radius: 0 0 12px 12px;
    display: grid;
    row-gap: 8px;
    column-gap: 1rem;
  }

  &__profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px 10px 10px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 5px 7px -1px rgba(51, 51, 51, 0.23);
    cursor: pointer;
    transition: transform 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98),
      box-shadow 0.25s cubic-bezier(0.7, 0.98, 0.86, 0.98);
    background-color: #fff;

    &:hover {
      transform: scale(0.8);
    }
  }

  &__picture {
    max-width: 100%;
    width: 60px;
    border-radius: 50%;
    box-shadow: 0 0 0 10px #ebeef3, 0 0 0 22px #f3f4f6;
  }

  &__name {
    color: #979cb0;
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0.64px;
    margin-left: 12px;
  }

  &__value {
    color: var(--red-300);
    font-weight: 700;
    font-size: 24px;
    text-align: right;

    & > span {
      opacity: 0.8;
      font-weight: 600;
      font-size: 12px;
      margin-left: 3px;
    }
  }
}

.leaderboard {
  box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.4);
}
</style>
