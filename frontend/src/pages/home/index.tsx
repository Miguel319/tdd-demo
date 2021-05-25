import { useEffect } from "react";
import Hero from "../../components/Home/Hero";
import { useAppDispatch } from "../../redux/store/index";
import { getCurrentUser } from "../../redux/actions/auth.action";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  return (
    <div>
      <Hero />
    </div>
  );
};

export default Home;
