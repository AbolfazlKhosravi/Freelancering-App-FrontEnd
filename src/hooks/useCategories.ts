import { useQuery } from "@tanstack/react-query";
import { getCategoryApi } from "../services/categoryServices";

export default function useCategories() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoryApi,
    retry: false,
  });

  // {_id, title, enTitle, ....}
  const { categories: rawCategories = [] } = data || {};

  // {value, label}
  const categories = rawCategories.map((item) => ({
    label: item.title,
    value: item.id,
  }));

  const transformedCategories = rawCategories.map((item) => ({
    label: item.title,
    value: item.englishTitle,
  }));

  return { isLoading, categories, transformedCategories };
}
