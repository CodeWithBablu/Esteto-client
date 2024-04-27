import { AuthContext } from "@/context/AuthContext";
import { UserType, toastMessage } from "@/lib";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { DropdownMenu, Theme } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Menu() {

  const { currUser, updateUser } = useContext(AuthContext) as { currUser: UserType | null, updateUser: (data: UserType | null) => void };
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      localStorage.removeItem("user");
      updateUser(null);
      toastMessage("success", "Logout successfully", 4000);
      navigate("/");
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        toastMessage("error", error.response?.data.message, 5000);
      }
      else
        toastMessage("error", "Failed to log out", 5000);
    }
  }

  return (
    <Theme accentColor="blue" className="font-chillax" radius="full">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className="flex items-center cursor-pointer">
            {
              currUser?.avatar ? <img src={currUser.avatar} className="h-8 w-8" alt="avatar" /> :
                <UserCircleIcon className="mx-2 h-8 w-8 text-zinc-600 md:h-10 md:w-10" />
            }
            {
              currUser?.username &&
              <span className=" mx-4 hidden text-zinc-600 text-xl font-[500] lg:inline-block">
                {currUser?.username.slice(0, 20)}{currUser?.username.length > 20 ? '...' : ''}
              </span>
            }

          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="bg-slate-200 min-w-[10rem] text-gray-800 font-poppins font-semibold">
          {
            currUser &&
            <DropdownMenu.Item className="text-xl p-2">
              <Link to={'/profile'}>Profile</Link>
            </DropdownMenu.Item>
          }
          {
            !currUser &&
            <DropdownMenu.Item className="text-xl p-2">
              <Link to={'/login'}>login</Link>
            </DropdownMenu.Item>
          }

          {/* <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
            <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

            <DropdownMenu.Separator />
            <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub> */}

          <DropdownMenu.Separator />
          <DropdownMenu.Item color="red" onClick={logout} className="text-xl p-2 text-rose-500 hover:text-gray-100">
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Theme>
  );
}