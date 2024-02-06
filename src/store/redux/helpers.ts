import { inject, computed } from "vue";
import { storeKey } from "./storePlugin";
import { store } from "./configurations";
import { RootState } from "./rootState";

export const useDispatch = () => store.dispatch;

// export const useSelector = <State extends RootState = RootState>(
//   fn: (state: State) => State[keyof State]
// ) => {
//   const rootStore = inject(storeKey) as { state: RootState };
//   return computed(() => fn(rootStore.state as State));
// };

// export const useReduxSelector = <T>(selectorFn: (state: RootState) => T) => {
//   const rootStore = inject(storeKey) as { state: RootState };
//   return computed(() => selectorFn(rootStore.state));
// };
