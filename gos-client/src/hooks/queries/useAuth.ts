import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {authService} from "../../services/authService.ts";

export const useAuth = () => {
  const queryClient = useQueryClient();

  // 1. Спрашиваем: мы залогинены?
  const { data: status, isLoading: isStatusLoading } = useQuery({
    queryKey: ['authStatus'],
    queryFn: authService.getStatus,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  // 2. Если да, грузим профиль
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: authService.getMe,
    enabled: !!status?.isAuthenticated, // Запрос только если авторизован
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // 3. Логаут
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Очищаем кэш и перезагружаем страницу для полного сброса
      queryClient.setQueryData(['authStatus'], { isAuthenticated: false });
      queryClient.setQueryData(['authUser'], null);
      window.location.reload();
    },
  });

  const login = () => {
    const currentPath = window.location.href; // Полный путь, включая домен фронта

    window.location.href = `https://localhost:7048/api/auth/login?returnUrl=${encodeURIComponent(currentPath)}`;
  };

  return {
    isAuthenticated: status?.isAuthenticated ?? false,
    user,
    isLoading: isStatusLoading || (status?.isAuthenticated && isUserLoading),
    login,
    logout: logoutMutation.mutate,
  };
};
