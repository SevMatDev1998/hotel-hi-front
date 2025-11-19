import RouteEnum from "../../enums/route.enum";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <h1 className="text-6xl font-extrabold text-dusty-teal sm:text-8xl">
        404
      </h1>
      <h2 className="mt-2 text-2xl font-semibold  sm:text-3xl">
        Oops! Page not found.
      </h2>
      <p className="mt-2 text-gray-600 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href={RouteEnum.LOGIN}
        className="mt-6 inline-block rounded bg-dusty-teal px-5 py-3 text-sm font-medium text-white  focus:outline-none  "
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
