import { excludedRoutes } from "@/constants/excluded-routes";
import { useGetMe } from "@/hooks/use-get-me";
import { PropsWithChildren } from "react";

export const Guard = ({ children }: PropsWithChildren) => {
  const currentPath = window.location.pathname;
  const isExcluded = excludedRoutes.includes(currentPath);
  const isAuthPage = ["/login", "/signup", "/register"].includes(currentPath);

  if (isExcluded && !isAuthPage) {
    return children;
  }

  return (
    <ProtectedContent isAuthPage={isAuthPage}>{children}</ProtectedContent>
  );
};

const ProtectedContent = ({
  children,
  isAuthPage,
}: PropsWithChildren<{ isAuthPage: boolean }>) => {
  const { data: user, loading } = useGetMe();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (user && isAuthPage) {
    window.location.href = "/";
    return null;
  }
  if (!user && !isAuthPage) {
    window.location.href = "/login";
    return null;
  }
  return children;
};
