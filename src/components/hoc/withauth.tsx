// src/components/hoc/withAuth.tsx
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// Define the type for the wrapped component's props
type WithAuthProps = {
  // Add any additional props here if needed
};

const withAuth = <P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  // Define the type of the component that will be returned
  const WithAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const accessToken =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    useEffect(() => {
      if (!accessToken) {
        router.replace("/login"); // Redirect to login if not authenticated
      }
    }, [accessToken, router]);

    if (!accessToken) {
      return null; // Optionally return a loading spinner or placeholder
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
