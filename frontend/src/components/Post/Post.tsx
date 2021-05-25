import { IJobPost } from "../../interfaces/models/IJobPost";
import { FC } from "react";
import { Link as RouteLink } from "react-router-dom";
import { formatDate } from "../../utils/formatter";

interface PostProps {
  post: IJobPost;
}

const Post: FC<PostProps> = ({ post }) => {
  const date: string = formatDate(post.createdAt!);

  const technologies = (): JSX.Element | null => {
    let count: number = 0;

    const techArr: Array<string> = [];

    if (post?.technologiesRequired?.length)
      for (const tech of post.technologiesRequired) {
        if (count === 1) break;

        techArr.push(tech);

        count++;
      }

    const techBtns = techArr.map((tech: string) => (
      <button className="bg-transparent text-black hover:bg-blue-500 hover:text-white  hover:border-white-700  border border-blue-500 font-bold py-1 px-4 ml-3 rounded-full">
        {tech}
      </button>
    ));

    return <div className="justify-around mb-2">{techBtns}</div>;
  };

  return (
    <div className="max-w px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-600 dark:text-gray-400">
          {date}
        </span>
        {technologies()}
        {/* <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">
          Design
        </a>
        <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">
          Design
        </a> */}
      </div>
      <div className="mt-2">
        <RouteLink
          to={`job-posts/${post._id}`}
          className="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
        >
          {post.title}
        </RouteLink>
        <p className="mt-2 text-gray-600 text-lg dark:text-gray-300">
          {post.description}
        </p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <RouteLink
          to={`job-posts/${post._id}`}
          className="text-blue-600 text-lg dark:text-blue-400 hover:underline"
        >
          Read more
        </RouteLink>
        <div className="flex items-center">
          <img
            className="hidden object-cover w-10 h-12 mx-1 rounded-full sm:block"
            src={post.company?.img}
            alt="avatar"
          />
          <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">
            {post.company?.name}
          </a>
        </div>
      </div>
    </div>

    // <div className="grid -r-full grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2 ">
    //   <div className="border-r border-b border-t border-l border-l border-grey-light border-l-0 lg:border-t lg:border-grey-light bg-white rounded p-4 flex flex-col justify-between leading-normal">
    //     <div className="mb-2">
    //       <div className="text-black font-bold text-xl mb-2">{post.title}</div>
    //       <p className="text-grey-darker text-base">{post.description}</p>
    //     </div>
    //     {technologies()}
    //     <div className="flex items-center">
    //       <img
    //         className="w-20 h-20 rounded-full"
    //         src={post.company?.img}
    //         alt={post.company?.name}
    //       />
    //       <div className="text-sm mt-4">
    //         <p className="text-black leading-none">{post.company?.name}</p>
    //         <p className="text-grey-dark">{date}</p>
    //       </div>
    //     </div>
    //     <div className="mt-4 justify-around">
    //       <button className="bg-blue-500 hover:bg-blue-400  text-white  border border-blue-500 font-bold py-2 px-4 ml-3 rounded-full">
    //         <i className="fas fa-file-alt mr-2"></i>
    //         View
    //       </button>
    //       <button className="bg-blue-500 hover:bg-blue-400  text-white  border border-blue-500 font-bold py-2 px-4 ml-3 rounded-full">
    //         <i className="fas fa-file-signature mr-1"></i>
    //         Apply
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Post;
