import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import qs from "query-string";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

interface QueryProps {
  [key: string]: string;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  selected,
}): JSX.Element => {
  const router: AppRouterInstance = useRouter();
  const params: ReadonlyURLSearchParams | null = useSearchParams();

  const handleCategoryBoxClick = (): void => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: QueryProps = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div
      onClick={handleCategoryBoxClick}
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition ${
        selected
          ? "border-b-indigo-500 text-indigo-500"
          : "border-transparent text-neutral-500 hover:text-neutral-800"
      }`}
    >
      <Icon size={25} />
      <div className="text-xs font-medium">{label}</div>
    </div>
  );
};

export default CategoryBox;
