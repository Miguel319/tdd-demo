import styles from "./loading.module.scss";

const Loading = () => {
  return (
    <div className="">
      <div
        className={`${styles["loader"]} mx-auto text-center ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20`}
      ></div>
    </div>
  );
};

export default Loading;
