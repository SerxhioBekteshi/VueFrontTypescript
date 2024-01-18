import { ref, provide, inject } from "vue";
import { AnyAbility } from "@casl/ability";

// Create a reactive reference for the ability
export const AbilitySymbol = Symbol("Ability");

export const provideAbility = () => {
  const ability = ref<AnyAbility>(undefined!);
  provide(AbilitySymbol, ability);
  return ability;
};

// Inject the ability in your component
export const useAbility = () => {
  const ability = inject(AbilitySymbol);
  if (!ability) {
    throw new Error("Ability is not provided");
  }
  return ability;
};
