import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-md rounded-[2rem] border border-app surface p-8 shadow-soft">
        <Outlet />
      </div>
    </div>
  );
}

