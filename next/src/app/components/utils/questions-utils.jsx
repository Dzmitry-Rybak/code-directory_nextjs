import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export const useQuestionsNavigation = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Проверяем доступен ли объект window
  const handleId = typeof window !== 'undefined' ? parseInt(window.localStorage.getItem('id')) : null;

  const onSelectQuestionsId = (id) => {
    window.localStorage.setItem('id', JSON.stringify(id))
    const params = new URLSearchParams(searchParams);
    params.set('id', id);

    replace(`${pathname}?${params.toString()}`);
  };

  return { handleId, onSelectQuestionsId};
};