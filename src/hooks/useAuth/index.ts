// import { useAppDispatch } from 'src/main/hooks';
import { getUser } from "@/store/features";
import { RootState } from "@/store/redux/rootState";
import { useDispatch, useReduxSelector } from "@/store/redux/helpers";

const useAuth = () => {
  //   const dispatch = useAppDispatch();
  const state = useReduxSelector((state: RootState) => state.user);

  const handleGetUser = () => {
    useDispatch()(getUser());
  };

  return { state, handleGetUser };
};
export default useAuth;
