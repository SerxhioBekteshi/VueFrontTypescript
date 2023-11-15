import { useReduxSelector } from "@/store/redux/helpers";
import { RootState } from "@/store/redux/rootState";
import PropertyManager from "@/utils/propertyManager";

const useGetUser = () => {
  const currentUser = useReduxSelector((state: RootState) => state.user);
  if (currentUser && PropertyManager.isDefined(currentUser)) {
    return currentUser;
  }
  return null;
};

export default useGetUser;
