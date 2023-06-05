import { BiSearch } from "react-icons/bi";

const Search: React.FC = (): JSX.Element => {
  return (
    <div className="mr-3 flex w-full cursor-pointer flex-row items-center justify-between rounded-full border-[1px] border-gray-300 py-2 transition duration-300 hover:border-gray-600 md:mr-0 md:w-auto">
      <div className="px-6 text-sm font-semibold">Anywhere</div>
      <div className="hidden flex-1 border-x-[1px] border-gray-400 px-6 text-center text-sm font-semibold sm:block">
        Any week
      </div>
      <div className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
        <div className="hidden sm:block">Add guests</div>
        <div className="rounded-full bg-indigo-500 p-2 text-white">
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  );
};

export default Search;
