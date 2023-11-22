// components/withAuth.js
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const router = useRouter();

    useEffect(() => {
      async function checkAuth() {
        const session = await getSession();
        console.log('middleware', session)
        if (!session?.user?.username) {
          console.log('middleware check authen')
          router.push("/auth/login"); // Redirect to login if not authenticated
        }
      }

      checkAuth();
    }, []);

    return <WrappedComponent {...props} />;
  };
}